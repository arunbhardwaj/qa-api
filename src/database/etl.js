const fs = require('fs')
const readline = require('readline')
const path = require('path')
const client = require('./pgsql.js')

async function processLines() {
  console.log('Reading input')
  console.time()
  const inputStream = fs.createReadStream(
    '/mnt/c/Users/Arun/Documents/Hack Reactor/sdc csvs/questions.csv',
    { encoding: 'utf8' }
  )

  const rl = readline.createInterface({
    input: inputStream,
  })

  let lineCounter = 0
  let headers = []
  let promiseArr = []
  console.log('Begin reading csv...')
  rl.on('line', async line => {
    if (lineCounter === 0) {
      headers = line.split(/,\s/)
      lineCounter++
    } else {
      let output = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/) //matches commas that have none or pairs of quotation marks and then does not have more quotation marks ahead of that
      output[0] = Number(output[0])
      output[1] = Number(output[1])
      output[6] = Number(output[6]) === 1
      output[7] = Number(output[7])

      let productsQuery = {
        text: 'INSERT INTO Products(id) VALUES($1) ON CONFLICT (id) DO UPDATE SET id = $1',
        values: [output[1]],
      }

      let questionsQuery = {
        text: 'INSERT INTO Questions(id,product_id,question_body,question_date,asker_name,asker_email,reported,question_helpfulness) VALUES($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO UPDATE SET id = $1',
        values: output,
      }

      promiseArr.push(updateDbs([productsQuery, questionsQuery], output))
      lineCounter++
      if (lineCounter % 10000 === 0) {
        console.log('Read lines', lineCounter)
        console.timeLog()
        console.log('Awaiting promises to resolve', promiseArr.length)

        // Uncomment to track memory usage
        // const used = process.memoryUsage().heapUsed / 1024 / 1024;
        // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

        inputStream.pause();
        await Promise.all(promiseArr)
          .then(() => {
            inputStream.resume();
            lineCounter = 1
            promiseArr = []
          })
      }
    }
  }).on('end', () => {
    rl.close()
    inputStream.close()
    Promise.all(promiseArr);
    console.timeEnd()
    console.log('Done reading csv.')
  })
}
processLines()

function updateDbs(queries) {
  return client
    .query(queries[0])
    .then(() => client.query(queries[1]))
    .catch(err => console.error(err))
}
