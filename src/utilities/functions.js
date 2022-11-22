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

/**
 * Method to trim text strings under a maximum character limit.
 * @param {String} text Text string to cut out.
 * @param {Number} maxLength Maximum text length permitted.
 * @returns {String} Clipped text string.
 */
const cutText = (text = '', maxLength = 255) => {
  return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text
}

module.exports = {
  emailValidator,
  passwordValidator,
  phoneValidator,
  cutText,
}