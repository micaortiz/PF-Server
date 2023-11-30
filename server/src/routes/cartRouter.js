const { Router } = require("express");
const { createCart } = require("../controllers/cartController/createCart");
// import cristian *ELIMINAR ESTOS COMENTARIOS Y REEMPLAZARLOS POR SUS IMPORT*
// import bruno
const { updateCart } = require ("../controllers/cartController/updateCart")

const cartRouter = Router()

//Create
cartRouter.post('/', createCart)
//Update
cartRouter.put("/", updateCart)
//Delete

//Cart by User


module.exports = cartRouter