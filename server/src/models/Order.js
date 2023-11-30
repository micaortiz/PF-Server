const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// POR AHORA ESTA TABLA NO ESTA TERMINADA
module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("In Process", "Paid", "Delivered", "Cancelled"),
        allowNull: false,
        defaultValue: "In Process",
      },
      mercadopagoTransactionId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mercadopagoTransactionStatus: {
        type: DataTypes.ENUM("Approved", "Rejected", "Pending"),
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
