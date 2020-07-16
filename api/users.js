/*imports*/
const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../config/dbKeys")
const passport = require("passport")

const validRegInput = require("../validate/register")
const validLogInput = require("../validate/login")

const User = require("../models/User")

/*test route*/
router.get("/test", (req, res) => res.json({ msg: "User route -- test." }))

/* POST api: register
 * register new users
 */
router.post("/register", (req, res) => {
    //validate register input
    const { errors, isValid } = validRegInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    //if email has already been registered 
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = "Email has already been registered!"
            return res.status(400).json(errors)
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            //hash password
            //default: 10 rounds
            bcrypt.genSalt((err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

/* POST api: login
 * login in existing user
 * return jwt token
 */
router.post("/login", (req, res) => {
    //validate login input
     const { errors, isValid } = validLogInput(req.body)
     
     if (!isValid) {
        return res.status(400).json(errors)
    }
    
    const email = req.body.email
    const password = req.body.password

    //if user email exist
    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = "Email not registered!"
            return res.status(404).json(errors)
        } 

        bcrypt.compare(password, user.password).then(isEqual => {
            if (isEqual) {
                const payload = {
                    id: user.id,
                    name: user.name
                }

                //jwt token
                jwt.sign (
                    payload,
                    keys.secretOrKey,
                    {
                        //expire in a week
                        expiresIn: 604800 
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        })
                    }
                )
            } else {
                errors.password = "Password incorrect"
                return res.status(400).json(errors)
            }
        })
    })
})

/* GET api: current
 * return the current user's id, name, and email
 */
router.get("/current", 
    passport.authenticate("jwt", { session: false }), 
    (req, res) => { 
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        })
    }
)

module.exports = router