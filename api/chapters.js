/*imports*/
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")

const { Chapter } = require("../models/Novel")
const Profile = require("../models/Profile")
const User = require("../models/User")

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

/* GET api: chapters/id
 * returns a chapter by id
 */
router.get("/:id", (req, res) => {
    Chapter.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } })
        .then(chapters => res.json(chapters))
        .catch(err => res.status(404).json({ nochapters: "Chapters does not exist!" }))
})