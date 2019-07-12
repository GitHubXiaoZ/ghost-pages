/*imports*/
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TagSchema =  new Schema({
    name: [
        {
            type: String
        }
    ]
})

const CommentSchema = new Schema({
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
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "comment"
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
            comments: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "comment"
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

const Post = mongoose.model("post", PostSchema)
const Comment = mongoose.model("comment", CommentSchema)
const Tag = mongoose.model("tag", TagSchema)

/*exports*/
module.exports = {
    Post: Post,
    Comment: Comment,
    Tag: Tag
}