import _ from 'lodash'
import moment from 'moment'

const sortFunc = (a, b, orderBy, way) => {
	let newA = _.get(a, orderBy)
	let newB = _.get(b, orderBy)
	if (way === 'asc') {
		// return newA < newB
		return +(newA > newB) || -(newA < newB) /* || (newA === null || newA === undefined) - (newB === null || newB === undefined) */;
	}
	else {
		// return newA > newB
		return -(newA > newB) || +(newA < newB) /* || (newA === null || newA === undefined) - (newB === null || newB === undefined) */;
	}


}
/**
 * Handle Sorting
 * @param {String} property
 * @param {String} way
 * @param {Array} data
 */
export const handleRequestSort = (property, way, data) => {
	const orderBy = property;
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