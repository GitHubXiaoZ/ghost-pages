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
    data.synopsis = !isEmpty(data.synopsis) ? data.synopsis : ""
    data.status = !isEmpty(data.status) ? data.status : ""
    data.text = !isEmpty(data.text) ? data.text : ""

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title cannot be empty!"
    }

    if (Validator.isEmpty(data.synopsis)) {
        errors.synopsis = "Synopsis cannot be empty!"
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "Status cannot be empty!"
    }

    if (Validator.isEmpty(data.text)) {
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

