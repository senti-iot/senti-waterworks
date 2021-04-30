import { wbAPI } from './data'
/**
 * Benchmark by hour
 * /v2/waterworks/data/benchmark/byhour/:orguuid/:from/:to
 * Data by hour
 * https://dev.services.senti.cloud/databroker/v2/waterworks/data/usagebyhour/2020-06-13/2020-06-14
 */

/**
 * @desc v3/installations - ALL installations
 */
export const getInstallations = async (orgUUID) => {
	let response = await wbAPI.get(`/v3/installations/${orgUUID}`).then(rs => rs.ok ? rs.data : rs.ok)
	return response
}
