import moment from 'moment'
import { eAPI } from './data'


/**
 * Create alarm
 */
export const createAlarm = async alarm => {
	let response = await eAPI.put('/alarm', alarm).then(rs => rs.ok ? rs.data : rs.ok)
	// console.log(response)
	return response
}


/**
 * Get Alarms
 */

export const getAlarmsV1 = async userUUID => {
	let response = await eAPI.get(`/alarms/${userUUID}`).then(rs => rs.ok ? rs.data : rs.ok)
	return response
}

/**
 * Get Alarm
 */

export const getAlarmV1 = async uuid => {
	let response = await eAPI.get(`/alarm/${uuid}`).then(rs => rs.ok ? rs.data : rs.ok)
	return response
}

/**
 * Get Notifications
 */

export const getNotificationsV1 = async uuid => {
	let endDate = moment().format('YYYY-MM-DD HH:mm:ss')
	let startDate = moment().subtract(7, 'd').format('YYYY-MM-DD HH:mm:ss')
	let response = await eAPI.get(`/usernotifications/${uuid}/${startDate}/${endDate}`).then(rs => rs.ok ? rs.data : rs.ok)
	return response
}