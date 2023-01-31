const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const Poll = new Schema({
    genre : { type: String, required: true },
    comment: { type: String, required: false },
    excluded: { type: String, required: false },
    ideas: { type: String, required: false},
    votes: { type: Number, required: false, default: "0"},
    user: { type: ObjectId, ref:"User" }
})


module.exports = mongoose.model("Poll", Poll)