const { Router } = require("express");
const {createOrder, purchaseResults} = require("../controllers/payments/mercadoPagoHandler")
const { savePurchaseData } = require("../controllers/payments/saveMercadoPagoDataCtrl")
const paymentsRouter = Router()

//Create
paymentsRouter.post("/createOrder", createOrder);

//Confirmation
paymentsRouter.get("/orderFeedback", purchaseResults);
paymentsRouter.post("/saveData", savePurchaseData);


module.exports = paymentsRouter