/*imports*/
const express =  require("express")
const connectToDB = require("./config/db")
const passport = require("passport")

const users = require("./api/users")
const profiles = require("./api/profiles")
const posts = require("./api/posts")

/*app*/
const app = express()

/*middleware*/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/*database*/
connectToDB()

/*passport middleware*/
app.use(passport.initialize())
/*config*/
require("./config/passport")(passport)

app.use("/api/users", users)
app.use("/api/profiles", profiles)
app.use("/api/posts", posts)

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server running on port ${port}.`))