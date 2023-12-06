const { Order } = require("../../db");

const getAllOrders = async () => {
  try {
    const ordersDb = await Order.findAll();
    if (!ordersDb) throw new Error("No orders in database");

    return ordersDb;
  } catch (error) {
    throw new Error("No orders in database");
  }
};

module.exports = { getAllOrders };
