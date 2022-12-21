const { validateEmail, validatePassword } = require ('./regex')

export default function login_validate (values){
    const errors = {};

    if(!values.email){
        errors.email = 'Email is Required'
    } else if(!validateEmail.test(values.email)){
        errors.email = 'Invalid Email'
    }

    if(!values.password){
        errors.password = 'Password is Required'
    } else if(!validatePassword.test(values.password)){
        errors.password = 'Password requires 8 characters with 1 special character, 1 digit, and at least 1 uppercase and lowercase letters.'
    }

    return errors;
}