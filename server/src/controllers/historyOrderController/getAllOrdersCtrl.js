const { getAllOrders } = require("../../handlers/historyOrderHandler/getAllOrdersHandler")

const getAllOrder = async (req, res) => {
  try {

    const allOrdersData = await getAllOrders();

    return res.status(200).json(allOrdersData)

  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = { getAllOrder };
