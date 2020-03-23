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

/* DELETE api: chapters/id
 * delete a chapter by id
 */
router.delete("/:id", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
        .then(profile => {
            Chapter.findById(req.params.id)
                .then(chapter => {
                    //checks if user is the one who created the chapter
                    if (chapter.user.toString() !== req.user.id) {
                        return res.status(401).json({ nopermission: "Not allowed to delete this chapter!" })
                    }
                    //delete chapter
                    chapter.remove().then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({ nochapters: "Chapter does not exist!" }))
        })
    }
)