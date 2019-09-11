/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*exports*/
module.exports = validateLoginInput = data => {
    let errors = {}

    /*sets fields
     *email
     *password
     *to empty string if no input was given*/
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""

    //validate email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email required!"
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid!"
    }

    //validate password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password required!"
    }

    /*returns errors*/
    return {
        errors,
        isValid: isEmpty(errors)
    }
}