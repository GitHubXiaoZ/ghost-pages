/*imports*/
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//chapter
const ChapterSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String
    },
    index: {
        type: Number
    },
    title: {
        type: String
    },
    text: {
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

//novel
const NovelSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String
    },
    title: {
        type: String
    },
    cover: {
        type: Buffer
    },
    status: {
        type: String
    },
    tags: [
        {
            type: String
        }
    ],
    ratings: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            },
            rating: {
                type: Number,
                default: 0
            }
        }
    ],
    avg_rating: {
        type: Number,
        default: 0
    },
    synopsis: {
        type: String
    },
    chapters: [
        {
            type: Schema.Types.ObjectId,
            ref: "chapter"
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "comment"
        }
    ],
    views: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    },
    update: {
        type: Date
    } 
})

Novel = mongoose.model("novel", NovelSchema)
Chapter = mongoose.model("chapter", ChapterSchema)

/*exports*/
module.exports = {
    Novel: Novel,
    Chapter: Chapter
}