/*imports*/
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    handle: {
        type: String,
        required: true,
        max: 25
    },
    status: {
        type: String,
        required: true
    },
    pfp: {
        type: String
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

/*exports*/
module.exports = Profile = mongoose.model("profile", ProfileSchema)