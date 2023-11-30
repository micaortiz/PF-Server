const { User, Country } = require("../../db");

const postUserCtrl = async(email, token) => {
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      // Si el usuario no existe, créalo
      const newUser = await User.create({
        email: email,
        token: token,
      });
      return newUser
    }

    return user;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

module.exports = { postUserCtrl };
