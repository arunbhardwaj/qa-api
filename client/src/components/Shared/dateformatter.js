const dateFormatter = (string) => {

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = string.slice(0, 4);
    let month = months[Number(string.slice(5, 7)) - 1];
    let date = string.slice(8, 10);


    return `${month} ${date}, ${year}`;
}

//'2021-04-28T00:00:00.000Z

export default dateFormatter;