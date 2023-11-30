const { Country } = require("../db");

const AllCountryCtrl = async () => {
  const allCountry = await Country.findAll();
  return allCountry;
};

module.exports = AllCountryCtrl;