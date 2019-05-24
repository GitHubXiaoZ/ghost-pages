/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*exports*/
module.exports = validatePostInput = data => {
    let errors = {}

    data.text = !isEmpty(data.text) ? data.text : ""

    if (Validator.isEmpty(data.text)) {
        errors.text = "Post must include some content!"
    }

    if (!Validator.isLength(data.text, { max: 300 })) {
        errors.text = "Post cannot exceed 300 characters!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

