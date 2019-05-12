/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*exports*/
module.exports = validateProfileInput = data => {
    let errors = {}

    /*sets fields to empty string if no input is given*/
    data.handle = !isEmpty(data.handle) ? data.handle : ""
    data.status = !isEmpty(data.status) ? data.status : ""

    /*validates profile handle*/
    if (Validator.isEmpty(data.handle)) {
        errors.handle = "Profile handle required!"
    }

    if (!Validator.isLength(data.handle, { min: 2, max: 20 })) {
        errors.handle = "Profile handle length must be between 2 and 20 characters!"
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "Profile status required!"
    }

    /*returns errors*/
    return {
        errors,
        isValid: isEmpty(errors)
    }
}