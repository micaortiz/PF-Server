const {Country} = require("../../db")

const getCountry = async (id) => {
    const country = await Country.findOne({where: {id: id}})
    if(country){
    return country.name}
}

module.exports = {getCountry};