/*imports*/
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")

const { Novel } = require("../models/Novel")
const Profile = require("../models/Profile")
const User = require("../models/User")

const validNovelInput = require("../validate/novel")
const validPostInput = require("../validate/post")
const validRatingInput = require("../validate/rating")

/*test route*/
router.get("/test", (req, res) => res.json({ msg: "Novel route -- test." }))

/* GET api: novels
 * return all novels
 */
router.get("/", (req, res) => {
    //sort by query
    //default by new
    let sort = req.query.sort ? req.query.sort : -1
    Novel.find()
        .sort({ date: sort })
        .then(novels => res.json(novels))
        .catch(err => res.status(404).json({ nonovels: "Novels have not been created!" }))
})

/* GET api: novels/id
 * return the novel by novel id
 */
router.get("/:id", (req, res) => {
    Novel.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } })
        .then(novels => res.json(novels))
        .catch(err => res.status(404).json({ nonovel: "Novel does not exist!" }))
})

/* GET api: novels/tags/all
 * return all tags
 */
router.get("/tags/all", (req, res) => {
    Novel.find()
        .then(novels => {
            const tag_list = []
            //append the unique tag of each novel separately into the master tag list
            novels.forEach(novel => novel.tags.forEach(tag => tag_list.includes(tag) ? null : tag_list.unshift(tag)))
            res.json(tag_list.sort())
        })
        .catch(err => res.status(404).json({ nonovels: "Novels have not been created!" }))
})

/* GET api: novels/tag/tag
 * return all novels with requested tag
 */
router.get("/tag/:tag", (req, res) => {
    let sort = req.query.sort ? req.query.sort : -1
    Novel.find({ tags: req.params.tag })
        .sort({ date: sort })
        .then(novels => res.json(novels))
        .catch(err => res.status(404).json({ nonovels: "Novels have not been created!" }))
})

/* GET api: novels/user/id
 * return all novels created by user's id
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
 * return all novels created by user's handle
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
        //validate novel input
        const { errors, isValid } = validNovelInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const tag_list = []
        if (req.body.tags) {
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
 * delete a specific novel
 */
router.delete("/:id", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
        .then(profile => {
            Novel.findById(req.params.id)
                .then(novel => {
                    //if novel was created by user
                    if (novel.user.toString() !== req.user.id) {
                        return res.status(401).json({ nopermission: "Not allowed to delete this novel!" })
                    }
                    //delete novel
                    novel.remove().then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({ nonovel: "Novel does not exist!" }))
        })
    }
)

/* POST api: novels/rate/id
 * rate a specific novel
 */
router.post("/rate/:id", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        //validates rating input
        const { errors, isValid } = validRatingInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }
        
        Profile.findOne({ user: req.user.id })
        .then(profile => {
            Novel.findById(req.params.id)
                .then(novel => {
                    //checks if the user has already rated the novel
                    if (novel.ratings.filter(rating => rating.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ rated: "Novel already rated!" })
                    }
                    //score from 1-5
                    const score = {
                        rating: req.body.rating,
                        user: req.user.id
                    }
                    //adds the user to novel.ratings
                    novel.ratings.unshift(score)
                    //calculate average rating
                    novel.avg_rating = ((Number(novel.avg_rating) * (novel.ratings.length - 1)) + Number(score.rating))
                                     / (novel.ratings.length)
                    novel.save().then(novel => res.json(novel))
                })
                .catch(err => res.status(404).json({ nonovel: "Novel does not exist!" }))
        })
    }
)

/* POST api: novels/unrate/id
 * unrate a previously rated novel
 */
router.post("/unrate/:id", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
        .then(profile => {
            Novel.findById(req.params.id)
                .then(novel => {
                    //checks if the user has rated the novel
                    if (novel.ratings.filter(rating => rating.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ rated: "Novel has not been rated!" })
                    }
                    //index of user's like in post.likes array
                    const index = novel.ratings.map(item => item.user.toString()).indexOf(req.user.id)
                    //value of rating being removed
                    const value = novel.ratings[index].rating
                    //checks items in novel.ratings
                    if (novel.ratings.length > 1) {
                        //recalculate rating
                        novel.avg_rating = ((Number(novel.avg_rating) * (novel.ratings.length)) - Number(value)) 
                                            / (novel.ratings.length - 1)
                    } else {
                        novel.avg_rating = 0
                    }
                    novel.ratings.splice(index, 1)
                    novel.save().then(novel => res.json(novel))
                })
                .catch(err => res.status(404).json({ nonovel: "Novel does not exist!" }))
        })
    }
)

/* POST api: novels/comment/id
 * comment on novel by id
 */
router.post("/comment/:id", 
    passport.authenticate("jwt", { session: false}), 
    (req, res) => {
        //validate comment input
        const { errors, isValid } = validPostInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        Novel.findById(req.params.id)
            .then(novel => {
                /*create a new comment*/
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    user: req.user.id,
                    novelID: novel.id
                }
                //add comment to novel.comments array
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
                //check if the user's comment exists
                if (novel.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                    return res.status(404).json({ nocomment: "Comment does not exist! "})
                }
                //index of user's comment in novel.comments array
                const index = novel.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)
                //remove the comment
                novel.comments.splice(index, 1)
                novel.save().then(novel => res.json(novel))
            })
            .catch(err => res.status(404).json({ nonovel: "Novel does not exist!" }))
        }
)

module.exports = router