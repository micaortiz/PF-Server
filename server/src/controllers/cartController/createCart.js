const { Cart, Product, User, Category } = require("../../db");

const createCart = async (req, res) => {
  try {
    const { UserId, productId, quantityProd } = req.body;

    console.log(UserId, productId, quantityProd);
    // Buscar el usuario y su carrito asociado
    let user = await User.findByPk(UserId, {
      attributes:["id","token"],
      include: {
        model: Cart,
        include: {
          model: Product,
          through: { attributes: ["quantityProd"] }, // es de Product_Carts de la tabla intermedia
          attributes: [
            "id",
            "nameProd",
            "image",
            "description",
            "price",
            "priceOnSale",
            "stock",
            "active"
          ],
          include: {
            model: Category,
            attributes: ["nameCat"],
          },
        },
      },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    if(!user.token){
      return res.status(404).send("Unauthorized. User token not found");
    }

    // Verificar si el usuario tiene un carrito
    let cart = user.Cart;

    if (!cart) {
      cart = await Cart.create();
      await user.setCart(cart); // se asocia al user
    }

    const product = await Product.findByPk(productId, {
      attributes: [
        "id",
        "nameProd",
        "image",
        "description",
        "price",
        "priceOnSale",
        "stock",
        "active"
      ],
    });

    if (!product) {
      return res.status(404).send("Products not found");
    }

    if (product.active && product.stock > 0) {
      
      await cart.addProduct(product, { through: { quantityProd: quantityProd } });
    } else {
      return res.status(400).send("Product is not available");
    }

    // await cart.addProduct(product, { through: { quantityProd: quantityProd } });

    cart = await Cart.findByPk(cart.id, {
      include: {
        model: Product,
        attributes: [
          "id",
          "nameProd",
          "image",
          "description",
          "price",
          "priceOnSale",
          "stock",
          "active"
        ],
        include: {
          model: Category,
          attributes: ["nameCat"],
        },
      },
    });
    // Calcular el precio total solo con price
    // let totalPrice = 0;
    // cart.Products.forEach((product) => {
    // totalPrice += product.price * product.Product_Carts.quantityProd;
    // });

    // Calcular el precio total teniendo en cuenta price y priceOnSale en caso de que lo tenga
    let totalPrice = 0;
    cart.Products.forEach((product) => {
      const productPrice =
        product.priceOnSale !== null ? product.priceOnSale : product.price;
      totalPrice += productPrice * product.Product_Carts.quantityProd;
    });

    cart.totalPrice = totalPrice;

    const itemsCart = {
      id: cart.id,
      UserId: cart.UserId,
      items: cart.Products.map((product) => ({
   
        nameProd: product.nameProd,
        image: product.image[0],
        description: product.description,
        price: product.price,
        priceOnSale: product.priceOnSale,
        stock: product.stock,
        active: product.active,
        quantityProd: product.Product_Carts.quantityProd,
        category: product.Category.nameCat,
      })),
      totalPrice: cart.totalPrice,
    };

    await cart.save();

    return res.status(200).json(itemsCart); 
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCart,
};