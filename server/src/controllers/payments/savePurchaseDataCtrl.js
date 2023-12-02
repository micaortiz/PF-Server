const {
  saveDataHandler,
} = require("../../handlers/paymentsHandler/saveDataHandler");

const { MercadoPagoConfig, Preference } = require("mercadopago");

const savePurchaseData = async (req, res) => {
  const {
    id,
    orderDate,
    status,
    mercadopagoTransactionId,
    mercadopagoTransactionStatus,
    UserId,
  } = req.body;
};
try {
  if (mercadopagoTransactionStatus !== "Approved")
    return res
      .status(400)
      .send({ error: "Purchase status is not approved, try again." });

  const saveData = await saveDataHandler(
    id,
    orderDate,
    status,
    mercadopagoTransactionId,
    mercadopagoTransactionStatus,
    UserId
  );
  if (saveData) {
    return res.status(200).json(saveData);
  }
} catch (error) {
  return res.status(404).send(error.message);
}

module.exports = {
  savePurchaseData,
};
