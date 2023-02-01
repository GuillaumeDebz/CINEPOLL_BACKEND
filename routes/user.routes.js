const express = require("express")
const userController = require("../controllers/user.controller")

const userRouter = express.Router()      
const authMiddleware = require("../middleware/auth.middleware")  


// REGISTER/LOGIN //
userRouter.post("/register", userController.register)               
userRouter.post("/login", userController.login) 

// FRIENDS //
userRouter.patch("/addFriend", authMiddleware, userController.addFriend)
userRouter.get("/friendList", authMiddleware, userController.getFriendList)


module.exports = userRouter