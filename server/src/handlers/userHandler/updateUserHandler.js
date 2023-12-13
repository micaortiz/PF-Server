const { User } = require("../../db");

const updateHandlerUser = async (
  id,
  name,
  lastName,
  email,
  password,
  address,
  phone,
  identityCard,
  postalCode,
  city,
  active,
  typeUser,
  CountryId
) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("user not found");
  }

  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.password = password;
  user.address = address;
  user.phone = phone;
  user.identityCard = identityCard;
  user.postalCode = postalCode;
  user.city = city;
  user.active = active;
  user.typeUser = typeUser;
  user.CountryId = CountryId;

  await user.save();
  return user;
};

module.exports = {
  updateHandlerUser,
};
