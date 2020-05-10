/*imports*/
const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/User")
const Profile = require("../models/Profile")

const validProfileInput = require("../validate/profile")

/*test route*/
router.get("/test", (req, res) => res.json({ msg: "Profile route -- test." }))

/* GET api: profile
 * return the current user's profile
 */
router.get("/", 
    passport.authenticate("jwt", { session: false }), 
    (req, res) => {
        const errors = {}
        
        Profile.findOne({ user: req.user.id })
            .populate("user", ["name"])
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

/* GET api: profile/all
 * return all profiles
 */
router.get("/all", 
    (req, res) => {
        const errors = {}

        Profile.find()
            .populate("user", ["name"])
            .then(profiles => {
                if (!profiles) {
                    errors.noprofiles = "Cannot find any profiles!"
                    return res.status(404).json(errors)
                }
                res.json(profiles)
            })
            .catch(err => res.status(404).json(err))
    }
)

/* GET api: profile/handle
 * return the profile of user's handle
 */
router.get("/handle/:handle", 
    (req, res) => {
        const errors = {}

        Profile.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } })
            .populate("user", ["name"])
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

/* GET api: profile/user_id
 * return the profile of user's id
 */
router.get("/user/:user_id", 
    (req, res) => {
        const errors = {}

        Profile.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } })
            .populate("user", ["name"])
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

/* POST api: profile
 * create/update the user's profile
 */
router.post("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        //validate profile input
        const { errors, isValid } = validProfileInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        //user profile
        const profileInfo = {}
        profileInfo.user = req.user.id
        if (req.body.handle) profileInfo.handle = req.body.handle
        if (req.body.pfp) profileInfo.pfp = req.body.pfp
        if (req.body.location) profileInfo.location = req.body.location
        if (req.body.bio) profileInfo.bio = req.body.bio

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    Profile.findOneAndUpdate(
                        { user: req.user.id }, 
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

/* DELETE api: profile
 * delete the user's profile
 */
router.delete('/',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
            User.findOneAndRemove({ _id: req.user.id }).then(() => {
                res.json({ success: true })
            })
        })
    }
)

module.exports = router