const { Order, User } = require("../../db");
const sendEmailController = require("../../utils/notifications");
const message = require("../../utils/messages");

const updateOrders = async (idOrder, statusDelivery) => {
  const dataOrder = await Order.findOne({
    where: { id: idOrder },
  });

  if (idOrder !== undefined) dataOrder.deliveryStatus = statusDelivery;

  console.log("Orden a actualizar ", dataOrder);
  if (!dataOrder) return { error: "There is no order record with this id" };

  // Obter el mail asociado con la orden
  const userId = dataOrder.UserId;
  const user = await User.findByPk(userId, { attributes: ["email"] });

  if (!user) return { error: "User not found for this order" };

  const userEmail = user.email;

  if (statusDelivery === "In Process") {
    await sendEmailController(message.statusInProcess, userEmail);
  } else if (statusDelivery === "Paid") {
    await sendEmailController(message.statusPaid, userEmail);
  } else if (statusDelivery === "Delivered") {
    await sendEmailController(message.statusDelivered, userEmail);
  } else if (statusDelivery === "Cancelled") {
    await sendEmailController(message.statusCancelled, userEmail);
  }

  await dataOrder.save();
  console.log("data despues de actualizar ", dataOrder.deliveryStatus);
  return dataOrder;
};

module.exports = {
  updateOrders,
};
