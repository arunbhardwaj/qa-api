# express-walk
express-walk retail portal designed to address the concern of an outdated UI.

# Technologies Used

# Installation

## Setting up the Front End (Optional):
If you wish to view a simple frontend to display other products questions and answers:

1. Run `npm run react-dev` to start compiling the front end files.
2. You may change the url to select a different product to display by adding a `product_id` query to the url. <br />
  The default product_id displayed is 1. <br />
  e.g. `localhost:3000/?product_id=<any product id you'd like to search for>` <br />
       `localhost:3000/?product_id=3`

## Setting up the Back End:
1. In a separate terminal, run `npm run server-dev`to start the backend.

## Setting up the database:
1. Start your postgres database.
2. The server should automatically create a database for the project
3. Create a copy of the `example.env` file, rename the file to `.env` and modify the database connections in accordance to your database settings.