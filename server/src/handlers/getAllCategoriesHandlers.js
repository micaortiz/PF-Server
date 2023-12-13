const getAllCategories = require ('../controllers/getCategoryControllers');

const getAllCategoriesHandlers = async (req, res) =>{
    try {
        const allCategories = await getAllCategories()
        return res.status(200).json(allCategories)
    } catch (error) {
        return res.status(404).json({ error: error.message})
    }
}

module.exports ={
    getAllCategoriesHandlers
}