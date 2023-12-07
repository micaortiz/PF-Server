const { Router } = require("express");
const orderRouter = Router();

const {
  getAllOrder,
} = require("../controllers/orderController/getAllOrdersCtrl");

const {
  updateOrder,
} = require("../controllers/orderController/updateOrderCtrl");

/* Trae el Historial de Compras */

orderRouter.get("/history", getAllOrder);
orderRouter.put("/update", updateOrder);

module.exports = orderRouter;
