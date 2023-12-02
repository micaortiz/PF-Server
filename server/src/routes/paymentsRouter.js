const { Router } = require("express");
const {createOrder, purchaseResults} = require("../controllers/payments/mercadoPagoHandler")
const paymentsRouter = Router()

//Create
paymentsRouter.post("/createOrder", createOrder);

//Confirmation
paymentsRouter.get("/orderFeedback", purchaseResults);
paymentsRouter.post("/savePurchaseData", purchaseResults);


module.exports = paymentsRouter