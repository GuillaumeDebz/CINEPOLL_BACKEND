require("dotenv").config()    // cibler le port dev?  
var cors = require("cors")                          
const express = require("express")
const initializeDB = require("./config/db")

const userRouter = require("./routes/user.routes")


const app = express()

app.use(cors( {} ))                
app.use(express.json()) 


initializeDB


app.use("/user", userRouter) 


app.listen(process.env.PORT, () => {                        
    console.log("Listen to port " + process.env.PORT);         
})







