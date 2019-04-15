/*imports*/
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")

const validateProfileInput = require("../validate/profile")

const User = require("../models/User")
const Profile = require("../models/Profile")

/*test route*/
router.get("/test", (req, res) => res.json({ msg: "Profile route -- working." }))

/* POST api: profile
 * creates the user's profile
 */
router.post("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const profileInfo = {}
        profileInfo.user = req.user.id
        if (req.body.handle) profileInfo.handle = req.body.handle
        if (req.body.location) profileInfo.location = req.body.location
        if (req.body.bio) profileInfo.bio = req.body.bio

        profileInfo.social = {}
        if (req.body.twitter) profileInfo.social.twitter = req.body.twitter
        if (req.body.facebook) profileInfo.social.facebook = req.body.facebook

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    Profile.findOneAndUpdate(
                        { user: req.body.id}, 
                        { $set: profileInfo },
                        { new: true }
                    ).then(profile => res.json(profile))
                } else {
                    Profile.findOne({ handle: profileInfo.handle }).then(profile => {
                        if (profile) {
                            errors.handle = "Handle already exists!"
                            res.status(400).json(errors)
                        }

                        new Profile(profileInfo).save().then(profile => res.json(profile))
                    })
                }
            })
    }
)

/* GET api: profile
 * returns the current user's profile
 */
router.get("/", 
    passport.authenticate("jwt", { session: false }), 
    (req, res) => {
        const errors = {}
        
        Profile.findOne({ user: req.user.id })
            .populate("user", ["name", "handle"])
            .then(profile => {
                if (!profile) {
                    errors.nullprofile = "This profile does not exist!"
                    return res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch(err => res.status(404).json(err))
        }
)

module.exports = router

