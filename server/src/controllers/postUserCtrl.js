const { User, Country } = require("../db");

const postUserCtrl = async(name, lastName, email, password, address, phone, identityCard, postalCode, city, active, typeUser, CountryId) => {

  const newUser = await User.create({ name, lastName, email, password, address, phone, identityCard, postalCode, city, active, typeUser });

  // Buscar el país por su ID
  const country = await Country.findByPk(CountryId);

  // Asociar el usuario con el país
  await newUser.setCountry(country);

  // Devolver el usuario creado con la información del país
return newUser;
};

module.exports = { postUserCtrl };
