const { Order } = require("../../db");
const sendEmailController = require("../../utils/notifications");
const message = require("../../utils/messages");

const updateOrders = async (idOrder, statusDelivery) => {
  const dataOrder = await Order.findOne({
    where: { id: idOrder },
  });

  if (idOrder !== undefined) dataOrder.deliveryStatus = statusDelivery;

  console.log("Orden a actualizar ", dataOrder);
  if (!dataOrder) return { error: "There is no order record with this id" };

  if (statusDelivery === "In Process") {
    await sendEmailController(message.statusInProcess);
  } else if (statusDelivery === "Paid") {
    await sendEmailController(message.statusPaid);
  } else if (statusDelivery === "Delivered") {
    await sendEmailController(message.statusDelivered);
  } else if (statusDelivery === "Cancelled") {
    await sendEmailController(message.statusCancelled);
  }

  await dataOrder.save();
  console.log("data despues de actualizar ", dataOrder.deliveryStatus);
  return dataOrder;
};

module.exports = {
  updateOrders,
};
