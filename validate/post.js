/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*export*/
module.exports = validatePostInput = data => {
    let errors = {}

    /*set field 
     *text
     *to empty string if no input is given*/
    data.text = !isEmpty(data.text) ? data.text : ""

    if (Validator.isEmpty(data.text)) {
        errors.text = "Post cannot be empty!"
    }

    //post cannot exceed 750 characters
    if (!Validator.isLength(data.text, { max: 750 })) {
        errors.text = "Post cannot exceed 750 characters!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

