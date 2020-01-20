/*import*/
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//user model
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

/*export */
module.exports = User = mongoose.model("users", UserSchema)