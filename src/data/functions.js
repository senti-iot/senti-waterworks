import _ from 'lodash'
import moment from 'moment'


/**
 * Month redux
 */
export const monthRedux = data => {
	data = data.reduce((res, row) => {
		let month = moment(row.date).startOf("month").format("YYYY-MM-DD")

		if (!res[month]) {
			res[month] = {
				value: row.value,
				count: 1,
				datetime: month
			}
		}
		else {
			res[month] = {
				value: res[month].value + row.value,
				count: res[month].count + 1
			}
		}

		return res
	}, {})
	data = Object.keys(data).map(r => ({
		value: data[r].value,
		date: r,
	}))
	return data
}
/**
 * Short Number
 */
export function formatShortNumber(num, digits = 2, t) {
	let value = parseFloat(num)
	var suffixes = ["", "", t("numSuffix.million"), t("numSuffix.billion"), t("numSuffix.trillion")]
	var suffixNum = Math.floor((value.toFixed(0)).length / 3)
	var shortValue = suffixNum > 1 ? parseFloat((value / Math.pow(1000, suffixNum))).toFixed(2).replace('.', ',') : formatNumber(value, digits)

	return shortValue + " " + suffixes[suffixNum]
}
/**
 * Danish Format number
 * @param {number} num - Value to be converted
 * @param {number} digits - Nr. of digits, default 3
 */
export function formatNumber(num, digits = 3) {
	// return num.toString()

	return num ? parseFloat(num.toString().replace(',', '.')).toFixed(digits).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0
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


export const contrastColor = (bgColor, lightColor = '#ffffff', darkColor = '#000000') => {
	var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor
	var r = parseInt(color.substring(0, 2), 16) // hexToR
	var g = parseInt(color.substring(2, 4), 16) // hexToG
	var b = parseInt(color.substring(4, 6), 16) // hexToB
	return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
		darkColor : lightColor
}
