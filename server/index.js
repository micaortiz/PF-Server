require("dotenv").config(); // DEPLOY
const {PORT} = process.env; // DEPLOY

/* server config */
const server = require("./src/server");

/* bd config */
const { conn } = require("./src/db");

const { dbConnect } = require("./src/utils/dbConnect.js");

// Conexion con la bd
conn
  .sync({ force: false })
  // un vez que funcione correctamente cambiar a false
  .then(() => {
    // establecer conexion con la bd
      dbConnect();
    server.listen(PORT,"0.0.0.0", () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
