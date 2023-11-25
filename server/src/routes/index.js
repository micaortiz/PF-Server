/* express config */
const express = require("express");
const { newProduct } = require("../controllers/newProductCtrl");

const { getByName } = require("../controllers/productsName");
const { updateProduct } = require("../controllers/updateProductCtrl");
const { deleteProduct } = require("../controllers/deletePrdocutCtrl");
const { getAllProducts } = require("../controllers/getAll_Products")
const router = express.Router();
// const {Router} = require('express')
const {
  getAllCategoriesHandlers,
} = require("../handlers/getAllCategoriesHandlers");
const { getAllProductHandler } = require("../handlers/getProductsByIdHandler");
const { getProductsById } = require("../controllers/getProductsByIdCtrl");
const { postCategory } = require("../controllers/postCategoryCtrl");
//Create
router.post("/products", newProduct);
//Create category
router.post("/categories", postCategory)
//AllCategory
router.get("/categories", getAllCategoriesHandlers);
//Update
router.put("/products", updateProduct);
//Delete
router.delete("/products", deleteProduct);
//SearchByName
router.get("/products/name?", getByName);
//All Product  //* Validar si vienen datos por Query para trabajar sobre la misma ruta del GET.
router.get("/products", getAllProducts)
// Products By Id
router.get("/products/:id", getProductsById);
module.exports = {
  router,
};
