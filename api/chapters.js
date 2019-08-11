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