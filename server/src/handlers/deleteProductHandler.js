const {Product} = require("../db")

const deleteHandler = async (id) => {
    const deleted = await Product.findByPk(id)

    deleted.active = false

    await deleted.save()
    return deleted
}

module.exports = {
    deleteHandler,
}