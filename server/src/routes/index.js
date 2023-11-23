/* express config */
const express = require("express");
const { newProduct } = require("../controllers/newProductCtrl");
const { getByName } = require("../controllers/productsName");
const router = express.Router();

//Create
router.post("/products", newProduct);
router.get("/categories");

//Update
router.put("/products");

//Delete
router.delete("/products");

//GET
router.get("/products/name?", getByName);

module.exports = {
  router,
};
