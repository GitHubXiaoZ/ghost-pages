/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*export*/
module.exports = validatePostInput = data => {
    let errors = {}

    //set text to empty string if no input is given
    data.text = !isEmpty(data.text) ? data.text : ""

    //validators
    //post
    if (Validator.isEmpty(data.text)) {
        errors.text = "Post content cannot be empty!"
    }

    if (!Validator.isLength(data.text, { max: 750 })) {
        errors.text = "Post cannot exceed 750 characters!"
    }

    /*return errors*/
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

