const { postUserCtrl } = require("../../handlers/userHandler/createUserHandler");

const createUser = async (req, res) => {
  const {
    email,
    token
  } = req.body
  try {
    const user = await postUserCtrl(
      email,
      token
    )
    res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { createUser };
