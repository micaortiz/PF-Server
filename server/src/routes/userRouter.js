const { Router } = require("express");


const { deleteUser } = require("../controllers/userController/deleteUser");

const userRouter = Router()

//Create

//Update

//All Users

//User by Id

//All Country

//Delete
userRouter.delete('/:id' , deleteUser)

module.exports = userRouter