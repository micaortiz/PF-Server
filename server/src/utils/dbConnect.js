const data = require("../../api/db.json");

const { Product, Category } = require("../db.js");

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

    // console.log('### Database loaded successfully ###');
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  dbConnect,
};
