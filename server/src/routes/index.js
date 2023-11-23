/* express config */
const express = require("express");
const { newProduct } = require("../controllers/newProductCtrl");
const router = express.Router();

//Create
router.post("/products", newProduct)
router.get("/categories",)

//Update
router.put("/products",)

//Delete
router.delete("/products",)




module.exports = {
    router
}







