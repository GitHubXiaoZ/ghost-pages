/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*export*/
module.exports = validateNovelInput = data => {
    let errors = {}
    const status = ["On Going", "Completed", "Hiatus"]

    /*set fields
     *title
     *synopsis
     *status
     *to empty string if no input is given*/
    data.title = !isEmpty(data.title) ? data.title : ""
    data.synopsis = !isEmpty(data.synopsis) ? data.synopsis : ""
    data.status = !isEmpty(data.status) ? data.status : ""

    const valid_status = status.includes(data.status)

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
    } else if (!valid_status) {
        errors.status = "Status should only be \"On Going\", \"Completed\", or \"Hiatus\"."
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

