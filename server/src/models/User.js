const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        // type: DataTypes.UUID,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      identityCard: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // el valor por defecto es true para inhabilitarlo se cambia a false
      },
      typeUser: {
        type: DataTypes.ENUM("Admin", "Invited", "User"),
        defaultValue: "User",
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
      }
    },
    { timestamps: false }
  );
};
