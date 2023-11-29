const { User } = require("../db");

const updateHandlerUser = async (
  id,
  userName,
  name,
  lastName,
  email,
  address,
  phone,
  identityCard,
  postalCode,
  city,
  active,
  typeUser,
  CountryId,
) => {
  const user = await User.findByPk(id);
 
  if (!user) {
    throw new Error("user not found");
  }

  if (userName !== undefined) user.userName = userName;
  if (name !== undefined) user.name = name;
  if (lastName !== undefined) user.lastName = lastName;
  if (email !== undefined) user.email = email;
  if (address !== undefined) user.address = address;
  if (phone !== undefined) user.phone = phone;
  if (identityCard !== undefined) user.identityCard = identityCard;
  if (postalCode !== undefined) user.postalCode = postalCode;
  if (city !== undefined) user.city = city;
  if (active !== undefined) user.active = active;
  if (typeUser !== undefined) user.typeUser = typeUser;
  if (CountryId !== undefined) user.CountryId = CountryId;

  await user.save();
  return user;
};

module.exports = {
  updateHandlerUser,
};
