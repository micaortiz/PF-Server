const {restaureProduct} = require("../handlers/restoreDeletedProduct")

const restauredDeletedProduct = async (req, res) => {
    const {id} = req.params
    try {
        const restauredProduct = await restaureProduct(id)

        res.status(200).json(restauredProduct)
    } catch (error) {
        res.status(404).json({error: "Something happen, failed request"})
    }
}

module.exports = {
    restauredDeletedProduct
}