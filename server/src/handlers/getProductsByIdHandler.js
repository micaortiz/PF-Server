const {Product, Category} = require("../db")

const getProductsByIdHandler = async(id)=>{
    const product = await Product.findByPk(id, {
        include: {
            model: Category,
            attributes: ["nameCat"],
          },
    })

    let productId;
    if(product){
        productId={
            id: product.id,
            nameProd: product.nameProd,
            brand: product.brand,
            descripition: product.descripition,
            price: product.price,
            discountPercentage: product.discountPercentage,
            priceOnSale: product.priceOnSale,
            image: product.image,
            active: product.active,
            tags: product.tags,
            stock: product.stock,
            category: product.Category ? product.Category.nameCat : null

        }
    }

    return productId;
}

module.exports={
    getProductsByIdHandler
}