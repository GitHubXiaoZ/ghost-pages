/*imports*/
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")

const post = require("../models/Post")
const user = require("../models/User")

const validPostInput = require("../validate/post")

/*test route*/
router.get("/test", (req, res) => res.json({ msg: "Post route -- working." }))

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

module.exports = router