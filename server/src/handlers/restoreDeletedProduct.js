const {Sequelize} = require("sequelize")
const {Product} = require("../db");

const restaureProduct = async (id) => {
    const product = await Product.findOne({where: {
        id: id,
        deletedAt: {
            [Sequelize.Op.not]: null
        }
    },
    paranoid: false
})
    if(product){
        await product.restore()
        await product.save()
        return product
    }
}

module.exports = {
    restaureProduct
}