const { Router } = require("express");
const { createCart } = require("../controllers/cartController/createCart");
// import cristian *ELIMINAR ESTOS COMENTARIOS Y REEMPLAZARLOS POR SUS IMPORT*
const { deleteProductsCart } = require("../controllers/cartController/deleteProductsCart");
// import cristian
const cartRouter = Router()

//Create
cartRouter.post('/', createCart)
//Update

//Delete
cartRouter.delete('/', deleteProductsCart)
//Cart by User


module.exports = cartRouter