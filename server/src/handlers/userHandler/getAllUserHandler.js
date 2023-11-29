const { User, Country } = require("../../db");

const getAllUserHandler = async () => {
  const allUsers = await User.findAll({
    // Traemos todos los usuarios incluyendo el nombre de la tabla country
    include: {
      model: Country,
      attributes: ["name"],
    },
    order: [["id", "ASC"]],
  });

  let users = [];
  if (allUsers.length > 0) {
    allUsers.forEach((u) => {
      users.push({
        id: u.id,
        name: u.name,
        lastName: u.lastName,
        email: u.email,
        address: u.address,
        phone: u.phone,
        identityCard: u.identityCard,
        postalCode: u.postalCode,
        city: u.city,
        active: u.active,
        typeUser: u.typeUser,
        country: u.Country ? u.Country.name : null,
      });
    });
  }

  return users;
};

module.exports = {
  getAllUserHandler,
};
