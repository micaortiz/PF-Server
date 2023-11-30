const { postUserCtrl } = require("../controllers/postUserCtrl");

const createUserHandler = async (req, res) => {
  const {
    email,
    CountryId,
  }= req.body;

  try {
    // Llamar a la función que crea el usuario
    const newUser = await postUserCtrl(
      email,
      CountryId
    );
    // Responder con el usuario creado
    res.status(201).json(newUser);
  } catch (error) {
    // Manejar errores
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUserHandler };