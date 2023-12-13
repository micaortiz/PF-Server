const { Router } = require("express");
const { getAllOrder } = require("../controllers/historyOrderController/getAllOrdersCtrl");
const historyOrder = Router();

//Cart by User
historyOrder.get("/", getAllOrder);

module.exports = { historyOrder };
