const { Router } = require("express");


const { deleteUser } = require("../controllers/userController/deleteUser");
const { getAllUsers } = require("../controllers/userController/getAllUsers");
const userRouter = Router()


const { updateUsers } = require ("../controllers/updateUserCtrl")

//Create

//Update
userRouter.put("/", updateUsers);
//All Users
userRouter.get("/", getAllUsers);
//User by Id

//All Country

//Delete
userRouter.delete('/:id' , deleteUser)

module.exports = userRouter