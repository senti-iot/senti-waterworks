import _ from 'lodash'
import moment from 'moment'
/**
 * Short Number
 */
export function formatShortNumber(num, digits) {
	let value = parseFloat(num)
	var suffixes = ["", "", "mio.", "b", "t"]
	var suffixNum = Math.floor((value.toFixed(0)).length / 3)
	// console.log('value', value)
	// console.log('suffixNum', suffixNum)
	var shortValue = suffixNum > 1 ? parseFloat((value / Math.pow(1000, suffixNum))).toFixed(3).replace('.', ',') : formatNumber(value, 2)
	// console.log('shortValue', shortValue)
	// console.log('ASdf', value / Math.pow(1000, suffixNum))
	// if (shortValue % 1 !== 0) {
	// 	shortValue = shortValue.toFixed(1)
	// }
	return shortValue + " " + suffixes[suffixNum]
}
/**
 * Danish Format number
 * @param {number} num - Value to be converted
 * @param {number} digits - Nr. of digits, default 3
 */
export function formatNumber(num, digits = 3) {
	// return num.toString()

	return num ? parseFloat(num).toFixed(digits).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0
}
/**
 * Email validator
 */
export const validateEmail = (mail) => {
	if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
		return (true)
	}
	// alert("You have entered an invalid email address!")
	return (false)
}

export const getDates = (startDate, stopDate) => {
	var dateArray = []
	var currentDate = moment(startDate)
	var endDate = moment(stopDate)
	while (currentDate <= endDate) {
		dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
		currentDate = moment(currentDate).add(1, 'days')
	}
	return dateArray
}
/**
 * Helper function for sorting
 */
const sortFunc = (a, b, orderBy, way) => {
	let newA = _.get(a, orderBy)
	let newB = _.get(b, orderBy)
	if (way === 'asc') {
		// return newA < newB
		return +(newA > newB) || -(newA < newB) /* || (newA === null || newA === undefined) - (newB === null || newB === undefined) */
	}
	else {
		// return newA > newB
		return -(newA > newB) || +(newA < newB) /* || (newA === null || newA === undefined) - (newB === null || newB === undefined) */
	}


}
/**
 * Handle Sorting
 * @param {String} property
 * @param {String} way
 * @param {Array} data
 */
export const handleRequestSort = (property, way, data) => {
	const orderBy = property
	let newData = []
	newData = data.sort((a, b) => sortFunc(a, b, orderBy, way))
	return newData
}


/**
 * Date Time Formatter
 * @param {Date} date
 * @param {boolean} withSeconds
 */
export const dateTimeFormatter = (date, withSeconds) => {
	var dt
	if (withSeconds)
		dt = moment(date).format('DD MMMM YYYY HH:mm:ss')
	else
		dt = moment(date).format('lll')
	return dt
}

/**
 * Capitalize first letter
 * @param {String} string
 */

export const capitalizeFL = str => str.charAt(0).toUpperCase() + str.substring(1)