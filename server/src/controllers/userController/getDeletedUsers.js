const { Sequelize } = require("sequelize");
const {User} = require("../../db")

const deletedUsers = async () => {
      const usersErased = await User.findAll({
        where: {
          deletedAt: {
            [Sequelize.Op.not]: null
            }
        },
        paranoid: false
        });
      if(usersErased.length < 1){
        return error
      }
      return usersErased;
    
  };

module.exports = {
    deletedUsers,
}