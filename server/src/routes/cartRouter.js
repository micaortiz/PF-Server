const { Router } = require("express");
// import mica  *ELIMINAR ESTOS COMENTARIOS Y REEMPLAZARLOS POR SUS IMPORT*
const { getUpdateCarShopping } = require ("../controllers/getAndUpdateCarShopping")
// import bruno
// import cristian
const cartRouter = Router()

//Create

//Update
cartRouter.put("/", getUpdateCarShopping)
//Delete

//Cart by User


module.exports = cartRouter