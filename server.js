/*imports*/
const express =  require("express")
const mongoose = require("mongoose")

const db = require("./config/dbKeys").mongoURI

/*app*/
const app = express()

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


const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server running on port ${port}.`))