/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*exports*/
module.exports = validateNovelInput = data => {
    let errors = {}

    /*sets fields to empty string if no input is given*/
    data.title = !isEmpty(data.title) ? data.title : ""
    data.summary = !isEmpty(data.summary) ? data.summary : ""
    data.status = !isEmpty(data.status) ? data.status : ""

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title cannot be empty!"
    }

    if (Validator.isEmpty(data.summary)) {
        errors.summary = "Summary cannot be empty!"
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "Status cannot be empty!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

