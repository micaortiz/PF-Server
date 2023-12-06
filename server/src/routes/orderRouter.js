const { Router } = require("express");
const orderRouter = Router();

const {
  getAllOrder,
} = require("../controllers/orderController/getAllOrdersCtrl");

/* Trae el Historial de Compras */

orderRouter.get("/history", getAllOrder);

module.exports = orderRouter;
