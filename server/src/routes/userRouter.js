const { Router } = require("express");
const userRouter = Router()


const { updateUsers } = require ("../controllers/updateUserCtrl")

//Create

//Update
userRouter.put("/", updateUsers);
//All Users

//User by Id

//All Country

//Delete


module.exports = userRouter