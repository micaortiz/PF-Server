const { Router } = require("express");
const { createCart } = require("../controllers/cartController/createCart");
// import cristian *ELIMINAR ESTOS COMENTARIOS Y REEMPLAZARLOS POR SUS IMPORT*
// import bruno
// import cristian
const cartRouter = Router()

//Create
cartRouter.post('/', createCart)
//Update

//Delete

//Cart by User


module.exports = cartRouter