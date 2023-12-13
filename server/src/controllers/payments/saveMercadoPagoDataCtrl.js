const {
  savePurchaseDataHandler,
} = require("../../handlers/paymentsHandler/saveDataHandler");

const savePurchaseData = async (req, res) => {
  const { payment_id, status, id } = req.body;

  console.log(status, payment_id, id);

  try {
    if (status.toLowerCase() !== "approved")
      return res
        .status(400)
        .send({ error: "Purchase status is not approved, try again." });

    const saveData = await savePurchaseDataHandler(status, payment_id, id);
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
