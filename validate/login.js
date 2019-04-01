/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*exports*/
module.exports = validateLoginInput = data => {
    let errors = {}

    /*sets fields to empty string if left empty */
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""

    /*validates email field*/
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email required!"
    } else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid!"
    }

    /*validates password field*/
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password required!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}