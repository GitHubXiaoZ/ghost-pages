/*imports*/
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")

const { Comment } = require("../models/Post")
const Profile = require("../models/Profile")
const User = require("../models/User")

/*test route*/
router.get("/test", (req, res) => res.json({ msg: "Comment route -- test." }))

/* GET api: comments
 * return all comments
 */
router.get("/", (req, res) => {
    //sort by query
    //default by new
    let sort = req.query.sort ? req.query.sort : -1
    Comment.find()
        .sort({ date: sort })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ noposts: "Comments have not been created!" }))
})

/* GET api: comments/id
 * return comment by comment id
 */
router.get("/:id", (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => res.json(comment))
        .catch(err => res.status(404).json({ nopost: "Comment does not exist!" }))
})

/* DELETE api: comments/id
 * delete comment by id
 */
router.delete("/:id", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
        .then(profile => {
            Comment.findById(req.params.id)
                .then(comment => {
                    //if comment was created by user
                    if (comment.user.toString() !== req.user.id) {
                        return res.status(401).json({ nopermission: "Not allowed to delete this comment!" })
                    }
                    comment.remove().then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({ nopost: "Comment does not exist!" }))
        })
    }
)

module.exports = router