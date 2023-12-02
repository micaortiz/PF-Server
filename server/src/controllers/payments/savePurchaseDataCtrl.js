const {
  savePurchaseDataHandler,
} = require("../../handlers/paymentsHandler/saveDataHandler");


const savePurchaseData = async (req, res) => {
  const { status, mercadopagoTransactionId, mercadopagoTransactionStatus, UserId } = req.body;

  try {
    if (mercadopagoTransactionStatus !== "Approved")
      return res
        .status(400)
        .send({ error: "Purchase status is not approved, try again." });

    const saveData = await savePurchaseDataHandler(status, mercadopagoTransactionId, mercadopagoTransactionStatus, UserId);
    if (saveData) {
      return res.status(200).json(saveData);
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = {
  savePurchaseData,
};
