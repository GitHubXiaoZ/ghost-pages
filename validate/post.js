/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*exports*/
module.exports = validatePostInput = data => {
    let errors = {}

    /*sets field 
     *text
     *to empty string if no input is given*/
    data.text = !isEmpty(data.text) ? data.text : ""

    if (Validator.isEmpty(data.text)) {
        errors.text = "Post cannot be empty!"
    }

    /*post cannot exceed 1000 characters*/
    if (!Validator.isLength(data.text, { max: 1000 })) {
        errors.text = "Post cannot exceed 1000 characters!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

