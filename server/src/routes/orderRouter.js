const { Router } = require("express");
const orderRouter = Router();

const { getAllOrder } = require("../controllers/orderController/getAllOrdersCtrl");
const { getOrderByUserId } = require("../controllers/orderController/getOrderByUserIdCtrl");

/* Trae el Historial de Compras */

orderRouter.get("/history", getAllOrder);
// Order by UserId
orderRouter.get("/:UserId", getOrderByUserId)

module.exports = orderRouter;
