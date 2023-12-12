const { Order } = require("../../db");

const updateOrders = async (idOrder, statusDelivery) => {
  const dataOrder = await Order.findOne({
    where: { id: idOrder },
  });

  if (idOrder !== undefined) dataOrder.deliveryStatus = statusDelivery;

  console.log("Orden a actualizar ", dataOrder);
  if (!dataOrder) return { error: "There is no order record with this id" };

  
  await dataOrder.save();
  console.log("data despues de actualizar ", dataOrder.deliveryStatus); 
  return dataOrder;
};

module.exports = {
  updateOrders,
};
