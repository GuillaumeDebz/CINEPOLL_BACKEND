const mongoose = require("mongoose")        
const Schema = mongoose.Schema             
const ObjectId = Schema.Types.ObjectId


const User = new Schema({
    pseudo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    currentPoll: { type: String, required: false },
    friends: [{ type: ObjectId, ref:"User"}] 
})


module.exports = mongoose.model("User", User)