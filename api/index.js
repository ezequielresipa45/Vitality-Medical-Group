const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { PORT } = process.env;

// Syncing all the models at once.
conn
  .sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
    });
  })
  .catch((error) => console.log(error.message));
