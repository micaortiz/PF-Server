const { Router } = require("express");

const { createUser } = require("../controllers/userController/postUserCtrl");
const { updateUsers } = require("../controllers/userController/updateUserCtrl");
const { getAllUsers } = require("../controllers/userController/getAllUsers");
const { deleteUser } = require("../controllers/userController/deleteUser");

const userRouter = Router();

//Create
userRouter.post("/create", createUser);
//Update
userRouter.put("/", updateUsers);
//All Users
userRouter.get("/", getAllUsers);
//User by Id

//All Country

//Delete
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
