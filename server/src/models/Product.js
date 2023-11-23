const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      nameProd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discountPercentage: {
        type: DataTypes.INTEGER,
      },
      priceOnSale: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },

      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // el valor por defecto es true para inhabilitarlo se cambia a false
      },
      // si se agregan mas tags es necesario crear una nueva tabla y comentar esta
      tags: {
        type: DataTypes.ENUM("New", "Special Offer", "Limited Edition"),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
