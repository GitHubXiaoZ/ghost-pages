/*imports*/
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//profile model
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
    pfp: {
        type: Buffer
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

/*exports*/
module.exports = Profile = mongoose.model("profile", ProfileSchema)