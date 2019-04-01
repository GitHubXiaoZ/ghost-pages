/*imports*/
const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../config/dbKeys")

const validRegInput = require("../validate/register")
const validLogInput = require("../validate/login")

const User = require("../models/User")

/* POST api: register
 * register new users
 */
router.post("/register", (req, res) => {
    /*validates register inputs */
    const { errors, isValid } = validRegInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    /*checks if email has already been used */
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email has already been registered!"})
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            /*hash password */
            bcrypt.genSalt(10, (err, salt) => {
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
 * login in existing users
 * return jwt token
 */
router.post("./login", (req, res) => {
     /*validates login inputs */
     const { errors, isValid } = validLogInput(req.body)

     if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    /*determine if user email exists */
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not registered!"})
        } 

        /*password check*/
        bcrypt.compare(password, user.password).then(isEqual => {
            if (isEqual) {
                const payload = {
                    id: user.id,
                    name: user.name
                }

                /*jwt sign in token*/
                jwt.sign (
                    payload,
                    keys.secretOrKey,
                    {
                        /*expiration in a week*/
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
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" })
            }
        })
    })
})

module.exports = router