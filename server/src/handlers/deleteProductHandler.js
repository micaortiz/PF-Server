const {Product} = require("../db")

const deleteHandler = async (id) => {
    const deleter = await Product.destroy({where: {id: id}})
    return deleter
}

module.exports = {
    deleteHandler,
}