/*imports*/
const express =  require("express")
const mongoose = require("mongoose")
const passport = require("passport")

const users = require("./api/users")

const db = require("./config/dbKeys").mongoURI

/*app*/
const app = express()

/*passport middleware*/
app.use(passport.initialize())
/*config*/
require("./config/passport")(passport)

/*middleware*/
app.use(
    express.urlencoded({
        extended: false
    })
)

app.use(express.json)

/*database*/
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("Connected!"))
    .catch(err => console.log(err))

app.use("/api/users", users)

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server running on port ${port}.`))