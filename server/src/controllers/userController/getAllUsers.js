const {
  getAllUserHandler,
} = require("../../handlers/userHandler/getAllUserHandler");

const getAllUsers = async (req, res) => {
  try {
    const allUser = await getAllUserHandler();

    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  getAllUsers,
};
