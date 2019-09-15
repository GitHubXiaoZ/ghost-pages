/*imports*/
const express =  require("express")
const connectToDB = require("./config/db")
const passport = require("passport")

const users = require("./api/users")
const profiles = require("./api/profiles")
const posts = require("./api/posts")
const novels = require("./api/novels")
const comments = require("./api/comments")

//express middleware
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//database connection
connectToDB()

//express with passport
app.use(passport.initialize())
//passport configuration
require("./config/passport")(passport)

//api
app.use("/api/users", users)
app.use("/api/profiles", profiles)
app.use("/api/posts", posts)
app.use("/api/novels", novels)
app.use("/api/comments", comments)

//ports
const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server running on port ${port}.`))