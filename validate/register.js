/*imports*/
const Validator = require("validator")
const isEmpty = require("is-empty")

/*export*/
module.exports = validateRegisterInput = data => {
    let errors = {}
    //acceptable characters
    //alphabetic characters
    //, . ' -
    const regex = /^[a-zA-z ,.'-]+$/g

    /*set
     *name
     *email
     *password
     *to empty strings if no input was given
     */
    data.name = !isEmpty(data.name) ? data.name : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.password2 = !isEmpty(data.password2) ? data.password2 : ""

    const valid_name = data.name.match(regex)

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name required!"
    } else if (!valid_name) {
        errors.name = "Name can only include alphabetical characters, "
        errors.name += "spaces( ), commas(,), periods(.), apostrophes('), underscores(_), and hypens(-)"
    }

    if (!Validator.isLength(data.name, { min: 2, max: 15})) {
        errors.name = "Name must be between 2 and 15 characters!"
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email required!"
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Enter a valid email address!"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password required!"
    }

    if (!Validator.isLength(data.password, { min: 6 })) {
        errors.password = "Password must be at least 6 characters!"
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm your password!';
      } else if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords do not match!';
      }

    //return errors
    return {
        errors,
        isValid: isEmpty(errors)
    }
}