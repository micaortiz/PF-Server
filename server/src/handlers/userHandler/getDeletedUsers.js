const {deletedUsers} = require("../../controllers/userController/getDeletedUsers")

const bringErasedUsers = async (req, res) => {
    try {
        const erasedUsers = await deletedUsers()

        res.status(200).json(erasedUsers)
    } catch (error) {
        res.status(404).json({error: "We can't find any erased user"})
    }
}

module.exports = {
    bringErasedUsers
}