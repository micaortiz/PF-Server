const { Router } = require("express");
const { createCart } = require("../controllers/cartController/createCart");
// import cristian *ELIMINAR ESTOS COMENTARIOS Y REEMPLAZARLOS POR SUS IMPORT*
const { deleteProductsCart } = require("../controllers/cartController/deleteProductsCart");
const { updateCart } = require ("../controllers/cartController/updateCart");
const { getCartById } = require("../controllers/cartController/getCartById");

const cartRouter = Router()

//Create
cartRouter.post('/', createCart)
//Update
cartRouter.put("/", updateCart)
//Delete
cartRouter.delete('/', deleteProductsCart)
//Cart by User
cartRouter.get('/:UserId', getCartById )

module.exports = cartRouter