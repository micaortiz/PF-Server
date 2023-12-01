const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "Product_Carts",
    {
      quantityProd: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
    //   totalPrice: {
    //     type: DataTypes.FLOAT,
    //     allowNull: false,
    //   },
    },

    { timestamps: false }
  );
};