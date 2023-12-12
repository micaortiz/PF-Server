const { Order } = require("../../db");

const getAllOrders = async () => {
  try {
    const ordersDb = await Order.findAll();
    if (ordersDb.length === 0) return { error: "No orders in database" };

    return ordersDb;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getAllOrders };
