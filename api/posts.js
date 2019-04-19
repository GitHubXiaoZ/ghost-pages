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
    /*sort posts by recency*/
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ noposts: "Posts have not been created!" }))
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

        /*create a new post*/
        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            user: req.user.id
        })

    newPost.save().then(post => res.json(post))
    }
)

/* DELETE api: posts/id
 * deletes a specific post
 */
router.delete("/:id", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    /*checks if user is the one who created the post*/
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ nopermission: "Not allowed to delete this post!" })
                    }
                    /*deletes post*/
                    post.remove().then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({ nopost: "Post does not exist!" }))
        })
    }
)

/* POST api: posts/like/id
 * like a specific post
 */
router.post("/like/:id", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    /*checks if the user has already liked the post*/
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ liked: "Post already liked!" })
                    }
                    /*adds the user to post.likes indicating they liked the post*/
                    post.likes.unshift({ user: req.user.id })
                    post.save().then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ nopost: "Post does not exist!" }))
        })
    }
)

/* POST api: posts/unlike/id
 * unlike a previous liked post
 */
router.post("/unlike/:id", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    /*checks if the user has not liked the post*/
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ liked: "Post has not been liked!" })
                    }
                    /*index is the index of user's like in post.likes array*/
                    const index = post.likes.map(item => item.user.toString()).indexOf(req.user.id)
                    /*remove the user's like from post.likes*/
                    post.likes.splice(index, 1)
                    post.save().then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ nopost: "Post does not exist!" }))
        })
    }
)

/* POST api: posts/comment/id
 * comment on a specific post
 */
router.post("/comment/:id", 
    passport.authenticate("jwt", { session: false}), 
    (req, res) => {
        const { errors, isValid } = validPostInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        Post.findById(req.params.id)
            .then(post => {
                const newComment = {
                    text = req.body.text,
                    name = req.body.name,
                    user = req.user.id
                }

                post.comments.unshift(newComment)
                post.save().then(post => res.json(post))
            })
            .catch(err => res.status(404).json({ nopost: "Post does not exist!" }))
        }
)

/* DELETE api: posts/comment/id
 * delete a comment on a specific post
 */
router.post("/comment/:id", 
    passport.authenticate("jwt", { session: false}), 
    (req, res) => {
        
        Post.findById(req.params.id)
            .then(post => {
                /*check if the user's comment exists*/
                if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                    return res.status(404).json({ nocomment: "Comment does not exist! "})
                }
                /*index is the index of user's comment in post.comments array*/
                const index = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)
                /*remove the comment*/
                post.comments.splice(index, 1)
                post.save().then(post => res.json(post))
            })
            .catch(err => res.status(404).json({ nopost: "Post does not exist!" }))
        }
)

module.exports = router