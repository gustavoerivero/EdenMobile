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

/**
 * Method for reformatting the date supplied. The new format 
 * takes the form "dd/MM/yyyy".
 * @param {String} date Date to be formatted.
 * @returns {String} Date with new format.
 */
const formatDate = (date) => {
  try {
    let newDate = date.split('T')[0]
    newDate = newDate.split('-')
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
  } catch (error) {
    console.log(`Error trying to format the date: ${error}`)
    return null
  }
}

const getHour = (date) => {
  try {
    let hourData = date.split('T')[1]
    hourData = hourData.split(':')

    let hour = Number(hourData[0])
    let minute = Number(hourData[1])

    let time = hour <= 12

    hour = hour > 12 ? hour - 12 : hour

    return `${hour}:${minute} ${time ? 'A.M.' : 'P.M.'}`

  } catch (error) {
    console.log(`Error trying to get hour: ${error}`)
    return null
  }
}

const getDate = (date) => {

  try {

    const months = [
      'Enero', 'Febrero', 'Marzo',
      'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre',
      'Octubre', 'Noviembre', 'Diciembre'
    ]

    const days = [
      'Lunes', 'Martes', 'Miércoles', 'Jueves',
      'Viernes', 'Sábado', 'Domingo'
    ]

    const d = new Date(date)

    return {
      dayWeek: days[d.getDay()],
      day: d.getDate() + 1,
      month: months[d.getMonth()].toLowerCase(),
      year: d.getFullYear()
    } 

  } catch (error) {
    console.log(`Error trying to get date: ${error}`)
    return null
  }
}

module.exports = {
  emailValidator,
  passwordValidator,
  phoneValidator,
  cutText,
  formatDate,
  getHour,
  getDate,
}