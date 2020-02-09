/*imports*/
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")

const { Chapter } = require("../models/Novel")
const Profile = require("../models/Profile")
const User = require("../models/User")

const validChapterInput = require("../validate/chapter")

/*test route*/
router.get("/test", (req, res) => res.json({ msg: "Chapter route -- test." }))

/* GET api: chapters
 * return all chapters
 */
router.get("/", (req, res) => {
    //sort by query
    //default by new
    let sort = req.query.sort ? req.query.sort : -1
    Chapter.find()
        .sort({ date: sort })
        .then(chapters => res.json(chapters))
        .catch(err => res.status(404).json({ nochapters: "Chapters have not been created!" }))
})

/* GET api: chapters/id
 * return the chapter by chapter id
 */
router.get("/:id", (req, res) => {
    Chapter.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } })
        .then(chapters => res.json(chapters))
        .catch(err => res.status(404).json({ nochapters: "Chapters does not exist!" }))
})