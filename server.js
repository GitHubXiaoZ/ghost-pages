/*imports*/
const express =  require("express")
const mongoose = require("mongoose")
const passport = require("passport")

const users = require("./api/users")
const profile =require("./api/profile")

const port = process.env.PORT || 3001

/*app*/
const app = express()

/*middleware*/
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/*database*/
const db = require("./config/dbKeys").mongoURI

mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("Connected!"))
    .catch(err => console.log(err))

/*passport middleware*/
app.use(passport.initialize())
/*config*/
require("./config/passport")(passport)

app.get("/", (req, res) => res.send("o l l e h"))

app.use("/api/users", users)
app.use("/api/profile", profile)

app.listen(port, () => console.log(`Server running on port ${port}.`))