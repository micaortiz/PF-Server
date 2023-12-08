const {restaureUser} = require("../../controllers/userController/restauredDeletedUsers")

const restauredDeletedUsers = async (req, res) => {
    const {id} = req.params
    try {
        const restauredUser = await restaureUser(id)

        res.status(200).json(restauredUser)
    } catch (error) {
        res.status(404).json({error: "Something happen, failed request"})
    }
}

module.exports = {
    restauredDeletedUsers
}