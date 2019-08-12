/*imports*/
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")

const { Chapter } = require("../models/Novel")
const Profile = require("../models/Profile")
const User = require("../models/User")

const validNovelInput = require("../validate/novel")

/*test route*/
router.get("/test", (req, res) => res.json({ msg: "Chapter route -- working." }))

/* GET api: chapters
 * returns all chapters
 */
router.get("/", (req, res) => {
    //sorts by query
    //default by new
    let sort = req.query.sort ? req.query.sort : -1
    Chapter.find()
        .sort({ date: sort })
        .then(chapters => res.json(chapters))
        .catch(err => res.status(404).json({ nochapters: "Chapters have not been created!" }))
})