const {bringDeletedProducts} = require("../handlers/getDeleteProducts");

const getDeletedProducts = async (req, res) => {
    try {
        const product = await bringDeletedProducts()
        
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({error: "We can't find any erased Products"})
    }
}

module.exports = {
    getDeletedProducts
}