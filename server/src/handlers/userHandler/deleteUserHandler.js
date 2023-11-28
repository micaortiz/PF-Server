const { User } = require("../../db");

const deleteUserHandler = async (id) => {
  if (!id) throw Error("Please provide a valid ID");
  const deleteUser = await User.destroy({
    where: {
      id: id,
    },
  });

  if (deleteUser) {
    return { success: true, data: deleteUser };
  } else {
    return { success: false, error: "User was not deleted" };
  }
};

module.exports = {
  deleteUserHandler,
};
