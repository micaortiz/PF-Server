const { Router } = require("express");
const orderRouter = Router();

const {
  getAllOrder,
} = require("../controllers/orderController/getAllOrdersCtrl");
const {
  getOrderByUserId,
} = require("../controllers/orderController/getOrderByUserIdCtrl");

const {
  updateOrder,
} = require("../controllers/orderController/updateOrderCtrl");

/* Trae el Historial de Compras */

orderRouter.get("/history", getAllOrder);
// Actualizar una Orden
orderRouter.put("/update", updateOrder);
// Order by UserId
orderRouter.get("/:UserId", getOrderByUserId);

module.exports = orderRouter;
