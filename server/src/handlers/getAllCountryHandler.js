const  AllCountryCtrl = require("../controllers/AllCountryCtrl");

const getAllCountryHandler = async (req, res) => {
    try {
      const response = await AllCountryCtrl() 
      res.status(200).json(response)
    } catch (error) {
  res.status(200).json({ error: error.message })    
    }
  };

module.exports = { getAllCountryHandler };