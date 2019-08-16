/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*exports*/
module.exports = validateNovelInput = data => {
    let errors = {}

    /*sets fields
     *title
     *summary
     *status
     *to empty string if no input is given*/
    data.title = !isEmpty(data.title) ? data.title : ""
    data.summary = !isEmpty(data.summary) ? data.summary : ""
    data.status = !isEmpty(data.status) ? data.status : ""
    data.comment = !isEmpty(data.comment) ? data.text : ""

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title cannot be empty!"
    }

    if (Validator.isEmpty(data.summary)) {
        errors.summary = "Summary cannot be empty!"
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "Status cannot be empty!"
    }

    if (Validator.isEmpty(data.comment)) {
        errors.text = "Comment cannot be empty!"
    }

    if (Validator.isInt(data.rating, { min: 1, max: 10 })) {
        errors.rating = "Ratings must be between a value of 1 and 10!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

