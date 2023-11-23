/* express config */
const express = require("express");
const { newProduct } = require("../controllers/newProductCtrl");
const { updateProduct } = require("../controllers/updateProductCtrl");
const { deleteProduct } = require("../controllers/deletePrdocutCtrl");
const router = express.Router();

//Create
router.post("/products", newProduct)
router.get("/categories", )

//Update
router.put("/products", updateProduct)

//Delete
router.delete("/products", deleteProduct)




module.exports = {
    router
}







