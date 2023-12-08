const {Sequelize} = require("sequelize")
const {User} = require("../../db");

const restaureUser = async (id) => {
    const user = await User.findOne({where: {
        id: id,
        deletedAt: {
            [Sequelize.Op.not]: null
        }
    },
    paranoid: false
})
    if(user){
        await user.restore()
        await user.save()
        return user
    }
}

module.exports = {
    restaureUser
}