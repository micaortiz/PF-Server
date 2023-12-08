const { Router } = require("express");

const { createUser } = require("../controllers/userController/postUserCtrl");
const { updateUsers } = require("../controllers/userController/updateUserCtrl");
const { getAllUsers } = require("../controllers/userController/getAllUsers");
const { deleteUser } = require("../controllers/userController/deleteUser");
const { getUserById } = require("../controllers/userController/getUserById");
const { bringErasedUsers } = require("../handlers/userHandler/getDeletedUsers");

const userRouter = Router();

//Create
userRouter.post("/create", createUser);
//Update
userRouter.put("/", updateUsers);
//All Users
userRouter.get("/", getAllUsers);
//Users erased
userRouter.get("/deleted", bringErasedUsers)
//User by Id
userRouter.get("/:id", getUserById)

// userRouter.get('/:id', (req, res) => {
//       getUserById(req, res);
//   });

// userRouter.get('/', (req, res) => {
//       getAllUsers(req, res);
//   })

//Delete
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
