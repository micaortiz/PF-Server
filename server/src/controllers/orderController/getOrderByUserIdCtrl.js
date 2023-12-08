const { getOrderByUserIdHandler } = require("../../handlers/OrderHandler/getOrderByUserIdHandler");

const getOrderByUserId = async (req, res) => {
  try {
    const { UserId } = req.params;
    const orderId = await getOrderByUserIdHandler(UserId);

    if (!orderId) return res.status(404).send("Order not found");

    return res.status(200).json(orderId);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getOrderByUserId,
};
