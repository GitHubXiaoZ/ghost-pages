/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*exports*/
module.exports = validateNovelInput = data => {
    let errors = {}

    /*sets fields
     *title
     *synopsis
     *status
     *to empty string if no input is given*/
    data.title = !isEmpty(data.title) ? data.title : ""
    data.synopsis = !isEmpty(data.synopsis) ? data.synopsis : ""
    data.status = !isEmpty(data.status) ? data.status : ""

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title cannot be empty!"
    }

    //title should not be longer than 250 characters
    if (!Validator.isLength(data.title, { max: 250 })) {
        errors.title = "Title cannot exceed 250 characters!"
    }

    if (Validator.isEmpty(data.synopsis)) {
        errors.synopsis = "Synopsis cannot be empty!"
    }
    
    //synopsis should not be longer than 1000
    if (!Validator.isLength(data.synopsis, { max: 1000 })) {
        errors.synopsis = "Synopsis cannot exceed 1000 characters!"
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "Status cannot be empty!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

