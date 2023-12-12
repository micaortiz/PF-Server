const { Order } = require("../../db");
const getOrderByUserIdHandler = async (UserId) => {
  const order = await Order.findAll({
    where: {
      UserId: UserId,
    },
  });

  return order;
};

module.exports = {
  getOrderByUserIdHandler,
};
