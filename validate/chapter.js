/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*export*/
module.exports = validateChapterInput = data => {
    let errors = {}

    /*set the fields
     *title
     *text
     *index
     *to empty string if no input is given
     */
    data.title = !isEmpty(data.title) ? data.title : ""
    data.text = !isEmpty(data.text) ? data.text : ""
    data.index = !isEmpty(data.index) ? data.index : ""

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title cannot be empty!"
    }

    //title should not be longer than 250 characters
    if (!Validator.isLength(data.title, { max: 250 })) {
        errors.title = "Title cannot exceed 250 characters!"
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = "Chapter content cannot be empty!"
    }

    //index should be int
    if (!Validator.isInt(data.index)) {
        errors.index = "Index should be a numeral!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

