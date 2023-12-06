require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env; // LOCAL
// const { PG_DATABASE_URL } = process.env; // DEPLOY

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, //LOCAL
  // PG_DATABASE_URL,   // DEPLOY
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// se recorre el contenido y se importa cada archivo
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);

// convierte la primer letra en mayus, product -> Product
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const {
  Product,
  Category,
  ProductChange,
  Cart,
  User,
  Country,
  Review,
  Order,
  PurchaseHistory,
} = sequelize.models;

/* 1:1 */
User.hasOne(Cart);
Cart.belongsTo(User);

/* 1:N */
Product.belongsTo(Category);
Category.hasMany(Product);

ProductChange.belongsTo(Product);
Product.hasMany(ProductChange);

User.belongsTo(Country);
Country.hasMany(User);

Review.belongsTo(User);
User.hasMany(Review);

Order.belongsTo(User);
User.hasMany(Order);

Review.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Review, { foreignKey: "productId" });

User.hasMany(PurchaseHistory);
PurchaseHistory.belongsTo(User);

PurchaseHistory.hasMany(Cart);
Cart.belongsTo(PurchaseHistory);

/* N:M */
Product.belongsToMany(Cart, { through: "Product_Carts", timestamps: false });
Cart.belongsToMany(Product, { through: "Product_Carts", timestamps: false });

Product.belongsToMany(Order, { through: "Product_Order", timestamps: false });
Order.belongsToMany(Product, { through: "Product_Order", timestamps: false });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
