/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*exports*/
module.exports = validRatingInput = data => {
    let errors = {}

    /*sets fields
     *rating
     *to empty string if no input is given*/
    data.rating = !isEmpty(data.rating) ? data.rating : ""
    
    if (Validator.isEmpty(data.rating)) {
        errors.rating = "Rating cannot be empty!"
    }

    //rating should be between 1 - 5
    if (!Validator.isInt(data.rating, { min: 1, max: 5 })) {
        errors.rating = "Ratings must be between a value of 1 and 5!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

