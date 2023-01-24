// Imports //
require("dotenv").config()    // cibler le port dev?  
var cors = require("cors")                          
const express = require("express")
const initializeDB = require("./config/db")

// Import router //
const userRouter = require("./routes/user.routes")


// app //
const app = express()

app.use(cors( {} ))                
app.use(express.json()) 


// DB initialization //
initializeDB()


// use router //
app.use("/user", userRouter) 


// Listen to db //
app.listen(process.env.PORT, () => {                        
    console.log("Listen to port " + process.env.PORT);         
})








