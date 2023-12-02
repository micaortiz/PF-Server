const { Router } = require("express");
const {createOrder, purchaseResults} = require("../controllers/payments/mercadoPagoHandler")
const { savePurchaseData } = require("../controllers/payments/savePurchaseDataCtrl")
const paymentsRouter = Router()

//Create
paymentsRouter.post("/createOrder", createOrder);

//Confirmation
paymentsRouter.get("/orderFeedback", purchaseResults);
paymentsRouter.post("/save", savePurchaseData);


module.exports = paymentsRouter