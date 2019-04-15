/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = validateProfileInput = data => {
    let errors = {}

    data.handle = !isEmpty(data.handle) ? data.handle : ""
    data.status = !isEmpty(data.status) ? data.status : ""

    if (Validator.isEmpty(data.handle)) {
        errors.handle = "Profile handle required!"
    }

    if (Validator.isLength(data.handle, { min: 2, max: 20 })) {
        errors.handle = "Profile handle length must be between 2 and 20 characters!"
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "Profile status required!"
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
          errors.twitter = 'Not a valid URL'
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
          errors.twitter = 'Not a valid URL'
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}