/* express config */
const express = require("express");
const { newProduct } = require("../controllers/newProductCtrl");

const { getByName } = require("../controllers/productsName");
const { updateProduct } = require("../controllers/updateProductCtrl");
const { deleteProduct } = require("../controllers/deletePrdocutCtrl");
const { getAllProducts } = require("../controllers/getAll_Products")
const { getAllCountryHandler } = require('../handlers/getAllCountryHandler')

const router = express.Router();
// const {Router} = require('express')
const { getAllCategoriesHandlers } = require("../handlers/getAllCategoriesHandlers");
const { getProductsById } = require("../controllers/getProductsByIdCtrl");
const { postCategory } = require("../controllers/postCategoryCtrl");
const {getCountryById} = require("../controllers/country/getCountryById");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const paymentsRouter = require("./paymentsRouter");
const orderRouter = require("./orderRouter");
const reviewRouter = require("./reviewRouter");


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

/* users */
router.use('/users', userRouter)

/* payments */
router.use("/payments", paymentsRouter)

/*All country*/
router.get('/country', getAllCountryHandler)

/* Country by Id */
router.get('/country/id', getCountryById)

/* cart */
router.use('/cart', cartRouter)

/* order */
router.use('/order', orderRouter )

/* reviews */
router.use('/reviews', reviewRouter )





module.exports = {
  router,
};
