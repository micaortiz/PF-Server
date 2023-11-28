const { Router } = require("express");


const { deleteUser } = require("../controllers/userController/deleteUser");

const userRouter = Router()


const { updateUsers } = require ("../controllers/updateUserCtrl")

//Create

//Update
userRouter.put("/", updateUsers);
//All Users

//User by Id

//All Country

//Delete
userRouter.delete('/:id' , deleteUser)

module.exports = userRouter