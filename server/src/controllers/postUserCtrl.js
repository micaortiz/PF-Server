const { User, Country } = require("../db");

const postUserCtrl = async(email, CountryId) => {
  try {
    const [user, created] = await User.findOrCreate({where: {email: email}})

    const setCountry = await user.setCountry(CountryId)
    if(setCountry){
      return user
    }


  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

module.exports = { postUserCtrl };
