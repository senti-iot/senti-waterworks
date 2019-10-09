import _ from 'lodash'
import moment from 'moment'

const sortFunc = (a, b, orderBy, way, type) => {
	let newA = _.get(a, orderBy)
	let newB = _.get(b, orderBy)
	switch (type) {
		case 'string':
			if (way) {
				return newA.toString().toLowerCase() < newB.toString().toLowerCase() ? -1 : 1
			}
			else {
				return newB.toString().toLowerCase() <= newA.toString().toLowerCase() ? -1 : 1
			}
		case 'date':
			return way ? moment(new Date(newA)).diff(new Date(newB)) : moment(new Date(newB)).diff(new Date(newA))
		case 'number':
		case undefined:
			if (way) {
				return (newA === null || newA === undefined) - (newB === null || newB === undefined) || +(newA > newB) || -(newA < newB);
			}
			else {
				return -(newA > newB) || +(newA < newB) || (newA === null || newA === undefined) - (newB === null || newB === undefined);
			}
		default:
			break;
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
	newData = data.sort((a, b) => sortFunc(a, b, orderBy, way === 'desc' ? false : true))
	return newData
}