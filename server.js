require("dotenv").config( { path: "./.env.development"} )      
var cors = require("cors")                          
const express = require("express")



const app = express()

app.use(cors( {} ))                
app.use(express.json()) 


initializeDB()

app.listen(process.env.PORT, () => {                        
    console.log("Listen to port " + process.env.PORT);         
})







