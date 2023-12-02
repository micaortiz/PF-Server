const {
  updateHandlerUser,
} = require("../../handlers/userHandler/updateUserHandler");

const updateUsers = async (req, res) => {
  const {
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
    CountryId,
  } = req.body;

  try {
    const update = await updateHandlerUser(
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
    );
    console.log("Esto es lo que se modificó ", update.id);
    console.log("Succesfully Updated");
    res.status(200).json(update);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  updateUsers,
};
