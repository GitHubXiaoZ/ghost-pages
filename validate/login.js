/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*export*/
module.exports = validateLoginInput = data => {
    let errors = {}

    /*set the fields
     *email
     *password
     *to empty string if no input was given
     */
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""

    //email should not be empty
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email required!"
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid!"
    }

    //password should not be empty
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password required!"
    }

    /*returns errors*/
    return {
        errors,
        isValid: isEmpty(errors)
    }
}