const data = require("../../api/db.json");
const user = require("../../api/user.json");
const countries = require("../../api/countries.json");
const order = require("../../api/order.json");
const reviews = require("../../api/reviews.json");

const { Product, Category, User, Country, Order, Review } = require("../db.js");

const dbConnect = async () => {
  try {
    const categories = [
      { nameCat: "Laptops" },
      { nameCat: "Smartphones" },
      { nameCat: "Tablets" },
      { nameCat: "Smartwatches" },
      { nameCat: "Speakers" },
      { nameCat: "TV" },
    ];

    const categoryDB = categories.map((c) => Category.create(c));

    await Promise.all(categoryDB).then(() =>
      console.log("### Categories successfully charged ###")
    );

    const productDB = data.map((e) =>
      Product.create({
        nameProd: e.nameProd,
        brand: e.brand,
        description: e.description,
        price: e.price,
        discountPercentage: e.discountPercentage,
        priceOnSale: e.priceOnSale,
        image: e.image,
        active: e.active,
        tags: e.tags,
        stock: e.stock,
        CategoryId: e.CategoryId,
      })
    );
    await Promise.all(productDB).then(() =>
      console.log("### Product successfully charged ###")
    );
    const productId = Product.id;
    console.log("Id del producto ", productId);

    const countryDB = countries.map((t) =>
      Country.create({
        id: t.cca3,
        name: t.name.common,
      })
    );

    await Promise.all(countryDB).then(() =>
      console.log("### Country successfully charged ###")
    );

    const userDB = user.map((u) =>
      User.create({
        // id: u.id,
        name: u.name,
        lastName: u.lastName,
        email: u.email,
        address: u.address,
        phone: u.phone,
        identityCard: u.identityCard,
        postalCode: u.postalCode,
        city: u.city,
        active: u.active,
        typeUser: u.typeUser,
        token: u.token,
        CountryId: u.CountryId,
      })
    );

    await Promise.all(userDB).then(() =>
      console.log("### User successfully charged ###")
    );

    const orderDB = order.map((o) =>
      Order.create({
        userName: o.userName,
        itemsCart: o.itemsCart,
        orderDate: o.orderDate,
        deliveryStatus: o.deliveryStatus,
        mercadopagoTransactionId: o.mercadopagoTransactionId,
        mercadopagoTransactionStatus: o.mercadopagoTransactionStatus,
        totalPrice: o.totalPrice,
        UserId: o.UserId,
      })
    );

    await Promise.all(orderDB).then(() =>
      console.log("### Order successfully charged ###")
    );

    const reviewsDB = reviews.map((r) =>
      Review.create({
        UserId: r.id,
        reviewText: r.reviewText,
        rating: r.rating,
        productId: r.productId /*  */,
        userName: r.userName,
      })
    );

    await Promise.all(reviewsDB).then(() =>
      console.log("### reviews successfully charged ###")
    );

    // console.log('### Database loaded successfully ###');
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  dbConnect,
};
