const { User, Country } = require("../../db");

const getUserByIdHandler = async (id) => {
  const userFound = await User.findByPk(id, {
    include: {
      model: Country,
      attributes: ["name"],
    },
  });

  let userId;

  if (userFound) {
    userId = {
      id: userFound.id,
      name: userFound.name,
      lastName: userFound.lastName,
      email: userFound.email,
      address: userFound.address,
      phone: userFound.phone,
      identityCard: userFound.identityCard,
      postalCode: userFound.postalCode,
      city: userFound.city,
      active: userFound.active,
      typeUser: userFound.typeUser,
      token: userFound.token,
      country: userFound.Country ? userFound.Country.name : null,
    };
  }
  return userId;
};

module.exports = {
  getUserByIdHandler,
};
