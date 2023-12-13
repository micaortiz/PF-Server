const { Order, Product, Category,  } = require("../../db");

const salesByCategory = (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json(error.message) 
    }
}

module.exports = {
    salesByCategory
}