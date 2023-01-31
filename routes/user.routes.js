const express = require("express")
const userController = require("../controllers/user.controller")

const userRouter = express.Router()      


// REGISTER/LOGIN //
userRouter.post("/register", userController.register)               
userRouter.post("/login", userController.login) 

// FRIENDS //
userRouter.patch("/addFriend", userController.addFriend)
userRouter.get("/friendList", userController.getFriendList)


module.exports = userRouter