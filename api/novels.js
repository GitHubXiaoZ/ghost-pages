/*imports*/
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")

const { Novel } = require("../models/Novel")
const Profile = require("../models/Profile")
const User = require("../models/User")

const validNovelInput = require("../validate/novel")

/*test route*/
router.get("/test", (req, res) => res.json({ msg: "Novel route -- working." }))

/* GET api: novels
 * returns all novels
 */
router.get("/", (req, res) => {
    //sorts by query
    //default by new
    let sort = req.query.sort ? req.query.sort : -1
    Novel.find()
        .sort({ date: sort })
        .then(novels => res.json(novels))
        .catch(err => res.status(404).json({ nonovels: "Novels have not been created!" }))
})

/* GET api: novels/id
 * returns a post by post id
 */
router.get("/:id", (req, res) => {
    Novel.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } })
        .then(novels => res.json(novels))
        .catch(err => res.status(404).json({ nonovel: "Novel does not exist!" }))
})


/* GET api: novels/tags/all
 * returns all tags
 */
router.get("/tags/all", (req, res) => {
    Novel.find()
        .then(novels => {
            const tag_list = []
            //append the unique tag of each post separately into the master tag list
            novels.forEach(novel => novel.tags.forEach(tag => tag_list.includes(tag) ? null : tag_list.unshift(tag)))
            res.json(tag_list.sort())
        })
        .catch(err => res.status(404).json({ nonovels: "Novels have not been created!" }))
})

/* GET api: novels/tag/tag
 * returns all novels with requested tag
 */
router.get("/tag/:tag", (req, res) => {
    let sort = req.query.sort ? req.query.sort : -1
    Novel.find({ tags: req.params.tag })
        .sort({ date: sort })
        .then(novels => res.json(novels))
        .catch(err => res.status(404).json({ nonovels: "Novels have not been created!" }))
})

/* GET api: novels/user/id
 * returns all novels created by user's id
 */
router.get("/user/:id", (req, res) => {
    let sort = req.query.sort ? req.query.sort : -1
    Novel.find({ user: req.params.id })
        .populate("user", ["name"])
        .sort({ date: sort })
        .then(novels => res.json(novels))
        .catch(err => res.status(404).json({ nonovels: "Novels have not been created!" }))
})

/* GET api: novels/users/handle
 * returns all novels created by user's handle
 */
router.get("/users/:handle", (req, res) => {
    let sort = req.query.sort ? req.query.sort : -1
    Profile.findOne({ handle: req.params.handle })
            .populate("user", ["name"])
            .then(profile => {
                if (!profile) {
                    errors.nullprofile = "This profile does not exist!"
                    return res.status(404).json(errors)
                }
                Novel.find({ user: profile.user._id })
                    .sort({ date: sort })
                    .then(novels => res.json(novels))
                    .catch(err => res.status(404).json({ nonovels: "Novels have not been created!" }))
            })
            .catch(err => res.status(404).json(err))
})

/* POST api: novels
 * create a novel
 */
router.post("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        /*validates post input*/
        const { errors, isValid } = validNovelInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const tag_list = []
        if (req.body.tags) {
            //tags are lowercase          
            const tags = req.body.tags.split(",").map(tag => tag.trim().toLowerCase())
            //prevent duplicate tags
            tags.map(tag => tag_list.includes(tag) ? null : tag_list.unshift(tag))
        } 

        /*create a new novel*/
        const newNovel = new Novel({
            title: req.body.title,
            status: req.body.status,
            //alphabetical order
            tags: tag_list.sort(),
            synopsis: req.body.synopsis,
            name: req.body.name,
            user: req.user.id
        })

    newNovel.save().then(novel => res.json(novel))
    }
)

/* DELETE api: novels/id
 * deletes a specific novel
 */
router.delete("/:id", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
        .then(profile => {
            Novel.findById(req.params.id)
                .then(novel => {
                    /*checks if user is the one who created the post*/
                    if (novel.user.toString() !== req.user.id) {
                        return res.status(401).json({ nopermission: "Not allowed to delete this novel!" })
                    }
                    /*deletes post*/
                    novel.remove().then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({ nonovel: "Novel does not exist!" }))
        })
    }
)

/* POST api: posts/rate/id
 * rate a specific novel
 */
router.post("/rate/:id", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validNovelInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        Profile.findOne({ user: req.user.id })
        .then(profile => {
            Novel.findById(req.params.id)
                .then(novel => {
                    /*checks if the user has already rated the novel*/
                    if (novel.ratings.filter(rating => rating.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ rated: "Novel already rated!" })
                    }
                    /*score from 1-10*/
                    const score = {
                        rating: req.body.rating,
                        user: req.user.id
                    }
                    /*adds the user to novel.ratings indicating they rated the novel*/
                    novel.ratings.unshift(score)
                    novel.save().then(novel => res.json(novel))
                })
                .catch(err => res.status(404).json({ nonovel: "Novel does not exist!" }))
        })
    }
)

/* POST api: novels/comment/id
 * comment on a specific novel
 */
router.post("/comment/:id", 
    passport.authenticate("jwt", { session: false}), 
    (req, res) => {
        /*validates comment input*/
        const { errors, isValid } = validNovelInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        Novel.findById(req.params.id)
            .then(novel => {
                /*creates a new comment*/
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    user: req.user.id,
                    novelID: novel.id
                }
                /*add comment to novel.comments array*/
                novel.comments.unshift(newComment)
                novel.save().then(novel => res.json(novel))
            })
            .catch(err => res.status(404).json({ nonovel: "Novel does not exist!" }))
        }
)

/* DELETE api: novels/comment/id/comment_id
 * delete a comment on a specific novel
 */
router.delete("/comment/:id/:comment_id", 
    passport.authenticate("jwt", { session: false}), 
    (req, res) => {
        Novel.findById(req.params.id)
            .then(novel => {
                /*check if the user's comment exists*/
                if (novel.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                    return res.status(404).json({ nocomment: "Comment does not exist! "})
                }
                /*index is the index of user's comment in novel.comments array*/
                const index = novel.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)
                /*remove the comment*/
                novel.comments.splice(index, 1)
                novel.save().then(novel => res.json(novel))
            })
            .catch(err => res.status(404).json({ nonovel: "Novel does not exist!" }))
        }
)