/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*export*/
module.exports = validateProfileInput = data => {
    let errors = {}
    //acceptable characters
    //alphanumeric characters
    const regex = /^[a-zA-z0-9-]+$/g

    /*set field
     *handle
     *to empty string if no input is given*/
    data.handle = !isEmpty(data.handle) ? data.handle : ""

    const valid_profile = data.handle.match(regex)

    //validate profile handle
    if (Validator.isEmpty(data.handle)) {
        errors.handle = "Profile handle required!"
    } else if (!valid_profile) {
        errors.handle = "Profile handle can only include alphanumeric characters, _(underscore), and -(hyphen)!"
    }

    //handle should be between 2 - 20 characters
    if (!Validator.isLength(data.handle, { min: 2, max: 20 })) {
        errors.handle = "Profile handle length must be between 2 and 20 characters!"
    }

    /*returns errors*/
    return {
        errors,
        isValid: isEmpty(errors)
    }
}