/*imports*/
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")

const Post = require("../models/Post")
const Profile = require("../models/Profile")
const User = require("../models/User")

const validPostInput = require("../validate/post")

/*test route*/
router.get("/test", (req, res) => res.json({ msg: "Post route -- working." }))

/* GET api: posts
 * returns all posts
 */
router.get("/", (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404))
})

/* GET api: posts/id
 * returns a specific posts
 */
router.get("/:id", (req, res) => {
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopost: "Post does not exist!" }))
})

/* POST api: posts
 * create a post from a user
 */
router.post("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validPostInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            user: req.user.id
        })

    newPost.save().then(post => res.json(post))
    }
)

/* DELETE api: posts/id
 * deletes a specific posts
 */
router.delete("/:id", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.user.toString() !== user.id) {
                        return res.status(401).json({ nopermission: "Not allowed to delete this post!" })
                    }

                    post.remove().then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({ nopost: "Post does not exist!" }))
        })
    }
    
)

module.exports = router