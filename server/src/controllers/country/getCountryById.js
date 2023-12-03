const {getCountry} = require("../../handlers/countryHandler/getCountryById")

const getCountryById = async (req, res) => {
    const {id} = req.query;
    try {
        const country = await getCountry(id);
        res.status(200).json(country)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {getCountryById};