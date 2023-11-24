/* express config */
const express = require("express");
const { newProduct } = require("../controllers/newProductCtrl");

const { getByName } = require("../controllers/productsName");
const { updateProduct } = require("../controllers/updateProductCtrl");
const { deleteProduct } = require("../controllers/deletePrdocutCtrl");
const router = express.Router();
// const {Router} = require('express')
const { getAllCategoriesHandlers } = require('../handlers/getAllCategoriesHandlers');
//Create
router.post("/products", newProduct)
//AllCategory
router.get("/categories", getAllCategoriesHandlers)
//Update
router.put("/products", updateProduct)
//Delete
router.delete("/products", deleteProduct)
//SearchByName
router.get("/products/name?", getByName);

module.exports = {
  router,
};
