/*imports*/
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    tags: [
        {
            type: String
        }
    ],
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    comments: [
        {
            postID: {
                type: Schema.Types.ObjectId,
                ref: "post"
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            comments : [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: "users"
                    },
                    text: {
                        type: String,
                        required: true
                    },
                    name: {
                        type: String
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    },
                    update: {
                        type: Date
                    }
                }
            ],
            date: {
                type: Date,
                default: Date.now()
            },
            update: {
                type: Date
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    },
    update: {
        type: Date
    } 
})

/*exports*/
module.exports = Post = mongoose.model("post", PostSchema)