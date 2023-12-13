const {Sequelize} = require("sequelize")
const {Product} = require("../db")

const bringDeletedProducts = async ( ) => {
    const products = await Product.findAll({
        where: {
            deletedAt: {
                [Sequelize.Op.not]: null
            }
        },
        paranoid: false
    })
    if(products < 1){
        return error
    }
    return products
}

module.exports = {
    bringDeletedProducts
}