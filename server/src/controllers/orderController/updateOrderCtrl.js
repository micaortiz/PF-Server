const {
  updateOrders,
} = require("../../handlers/OrderHandler/updateOrderHandler");

const updateOrder = async (req, res) => {
  try {
    const { idOrder, statusDelivery } = req.body;

    const dataUpdate = await updateOrders(idOrder, statusDelivery);
    if (!dataUpdate) return res.status(404).send(error.message);
    return res.status(200).json(dataUpdate);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = {
  updateOrder,
};
