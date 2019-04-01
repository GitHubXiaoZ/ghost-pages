/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*exports*/
module.exports = validateRegisterInput = data => {
    let errors = {}

    /*sets fields to empty strings if no input was given */
    data.name = !isEmpty(data.name) ? data.name : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.password2 = !isEmpty(data.password2) ? data.password2 : ""

    /*validates name field*/
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name required!"
    }

    /*validates email field*/
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email required!"
    } else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid!"
    }

    /*validates password*/
    if(Validator.isEmpty(data.password)) {
        errors.password = "Password required!"
    }
    
    if(!Validator.isLength(data.password, { min: 6, max: 15 })) {
        errors.password = "Password must be between 6 and 15 characters!"
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm your password!"
    }

    if(!Validator.equals(password, password2)) {
        errors.password2 = "Passwords do not match!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}