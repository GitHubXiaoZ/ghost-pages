/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*exports*/
module.exports = validateChapterInput = data => {
    let errors = {}

    /*sets fields
     *title
     *text
     *to empty string if no input is given*/
    data.title = !isEmpty(data.title) ? data.title : ""
    data.text = !isEmpty(data.text) ? data.text : ""

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title cannot be empty!"
    }

    if (!Validator.isLength(data.title, { max: 250 })) {
        errors.title = "Title cannot exceed 250 characters!"
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = "Chapter cannot be empty!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

