import moment from 'moment'

export const dateTimeFormatter = (date, withSeconds) => {
	var dt
	if (withSeconds)
		dt = moment(date).format('DD MMMM YYYY HH:mm:ss')
	else
		dt = moment(date).format('lll')
	return dt
}
export function getContrast(hexcolor, reverse) {
	if (hexcolor) {

		var r = parseInt(hexcolor.substr(1, 2), 16)
		var g = parseInt(hexcolor.substr(3, 2), 16)
		var b = parseInt(hexcolor.substr(5, 2), 16)
		var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
		let white = 'white'
		let black = 'black'
		if (reverse) {
			return (yiq >= 128) ? white : black
		}
		else {
			return (yiq >= 128) ? black : white
		}
	}
	return 'inherit'
}