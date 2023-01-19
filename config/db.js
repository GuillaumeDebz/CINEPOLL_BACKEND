const mongoose = require("mongoose")                                    

const initializeDB = () => {                                             
    
    mongoose.set('strictQuery', false)                                  
    
    mongoose.connect("mongodb://127.0.0.1:27017/cinepolldb", (err) => {      
        if (err) return console.log("Erreur: " + err.message)            
        console.log("Connecté à la DB !");
    })
}

module.exports = initializeDB