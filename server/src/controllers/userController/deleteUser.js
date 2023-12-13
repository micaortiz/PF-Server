const {
  deleteUserHandler,
} = require("../../handlers/userHandler/deleteUserHandler");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDeleted = await deleteUserHandler(id);
    return res.status(200).json(userDeleted);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  deleteUser,
};
