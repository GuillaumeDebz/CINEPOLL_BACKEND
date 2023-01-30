const mongoose = require("mongoose")        
const Schema = mongoose.Schema             
const ObjectId = Schema.Types.ObjectId

const FriendList = new Schema({
    pseudo: { type: ObjectId, ref: "User" },
    currentPoll: { type: String, required: false, default: "" }
})


module.exports = mongoose.model("FriendList", FriendList)