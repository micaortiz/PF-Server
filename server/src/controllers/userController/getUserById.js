const { getUserByIdHandler} = require("../../handlers/userHandler/getUserByIdHandler");

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await getUserByIdHandler(id);

    if (!userId) return res.status(400).send("User not found");
    return res.status(200).json(userId);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getUserById,
};
