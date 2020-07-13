/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*export*/
module.exports = validRatingInput = data => {
    let errors = {}

    //set rating to empty string if no input is given
    data.rating = !isEmpty(data.rating) ? data.rating : ""
    
    //validators
    if (Validator.isEmpty(data.rating)) {
        errors.rating = "Rating cannot be empty!"
    }

    if (!Validator.isInt(data.rating, { min: 1, max: 5 })) {
        errors.rating = "Ratings must be between a value of 1 and 5!"
    }

    /*return errors*/
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

