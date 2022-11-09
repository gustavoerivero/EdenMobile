import RegExp from "./RegEx/RegEx"

const emailValidator = (email) => {
	return RegExp.regEmail.test(email)
}

const passwordValidator = (password) => {
	return RegExp.regPassword.test(password)
}

const phoneValidator = (phone) => {
	return RegExp.regPhone.test(phone)
}

module.exports = {
  emailValidator,
  passwordValidator,
  phoneValidator,
}