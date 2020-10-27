import { create } from 'apisauce'
import cookie from 'react-cookies'
import crypto from 'crypto'
import moment from 'moment'

const { REACT_APP_ENCRYPTION_KEY } = process.env
const IV_LENGTH = 16

const encrypt = (text) => {
	let iv = crypto.randomBytes(IV_LENGTH)
	let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer.from(REACT_APP_ENCRYPTION_KEY), iv)
	let encrypted = cipher.update(text)

	encrypted = Buffer.concat([encrypted, cipher.final()])

	return iv.toString('hex') + ':' + encrypted.toString('hex')
}

let backendHost, sentiAPI

const hostname = window && window.location && window.location.hostname

if (hostname === 'console.senti.cloud') {
	backendHost = 'https://senti.cloud/rest/'
	sentiAPI = 'https://api.senti.cloud/'
} else if (hostname === 'beta.senti.cloud') {
	backendHost = 'https://betabackend.senti.cloud/rest/'
	sentiAPI = 'https://dev.api.senti.cloud/'
} else {
	backendHost = 'https://betabackend.senti.cloud/rest/'
	sentiAPI = 'https://dev.api.senti.cloud/'
}
export const loginApi = create({
	baseURL: backendHost,
	timout: 30000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})
//https://dawa.aws.dk/vejnavne/autocomplete?q=vibor
export const dawaApi = create({
	baseURL: `https://dawa.aws.dk`,
	timeout: 30000,
	header: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})

export const customerDoIApi = create({
	baseURL: sentiAPI + 'annual/v1',
	timeout: 30000,
	headers: {
		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		// 'Cache-Control': 'public, max-age=86400'
	}
})
/* const apiRoute = '/holidays/v1/2018-01-01/2018-12-31/da' */
export const holidayApi = create({
	baseURL: sentiAPI + `holidays/v1`,
	timeout: 30000,
	headers: {
		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		// 'Cache-Control': 'public, max-age=86400'
	}
})
export const getHolidays = async (lang) => {
	let lastYear = moment().subtract(1, 'year').format('YYYY')
	let nextYear = moment().add(1, 'year').format('YYYY')
	let year = moment().format('YYYY')
	let data = await holidayApi.get(`/${lastYear}-01-01/${nextYear}-12-31/${lang}`).then(rs => rs.data)
	let data2 = await customerDoIApi.get(`/${lastYear}-01-01/${nextYear}-12-31/${lang}`).then(rs => rs.data)
	let newData = []
	if (data2) {
		newData = data2.map((d, i) => {
			if (i < data2.length / 3)
				d.date = `${lastYear}-${d.date}`
			else {
				if (i >= data2.length / 3 && i < 2 * data2.length / 3) { d.date = `${year}-${d.date}` }
				else {
					d.date = `${nextYear}-${d.date}`
				}
			}
			return d
		})
	}
	if (data && newData) {
		let datas = [...data, ...newData].sort((a, b) => a.date > b.date ? 1 : -1)
		return [...datas]
	}
	else
		return []
}
export const weatherApi = create({
	// baseURL: `http://localhost:3001/weather/v1/`,
	baseURL: `https://api.senti.cloud/weather/v1/`,
	timeout: 30000,
	headers: {
		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Cache-Control': 'public, max-age=864000'
	}
})
export const mapApi = create({
	baseURL: 'https://maps.googleapis.com/maps/api/geocode/',
	timeout: 30000,
	params: {
		key: process.env.REACT_APP_SENTI_MAPSKEY
	}
})
export const imageApi = create({
	baseURL: backendHost,
	timeout: 30000,
	headers: {
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		'Content-Type': 'multipart/form-data',
		'ODEUMAuthToken': ''
	},
})
export const api = create({
	baseURL: backendHost,
	timeout: 30000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'ODEUMAuthToken': '',
		// 'Cache-Control': 'public, max-age=86400'
	},
})



//#region Senti Services
const sentiServicesAPI = 'https://dev.services.senti.cloud/'
// const sentiServicesAPI = 'https://services.senti.cloud/databroker'
export const servicesCoreAPI = create({
	baseURL: sentiServicesAPI + 'core',
	timeout: 30000,
	headers: {
		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		// 'Cache-Control': 'public, max-age=86400'
	}
})

export const servicesAPI = create({
	baseURL: sentiServicesAPI + 'databroker',
	timeout: 30000,
	headers: {
		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		// 'Cache-Control': 'public, max-age=86400'
	}
})

export const tagsServicesAPI = create({
	baseURL: sentiServicesAPI + 'tagmanager',
	timeout: 30000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})

export const dataExportAPI = create({
	baseURL: sentiServicesAPI,
	// baseURL: 'localhost:3021',
	timeout: 300000,
	headers: {
		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})
const waterWorksEndPoint = 'https://waterworks.senti.cloud/'
export const waterworksAPI = create({
	baseURL: waterWorksEndPoint,
	timeout: 300000,
	headers: {
		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})
//#endregion

//Always the last

export const setHeaders = () => {
	servicesAPI.setHeader('wlHost', window.location.hostname)
	servicesCoreAPI.setHeader('wlHost', window.location.hostname)
	waterworksAPI.setHeader('wlHost', window.location.hostname)
}
export const setToken = () => {
	try {
		let session = cookie.load('SESSION')
		servicesAPI.setHeader('Authorization', `Bearer ${session.token}`)
		// servicesAPI.setHeader('wlHost', window.location.hostname)
		servicesCoreAPI.setHeader('Authorization', `Bearer ${session.token}`)
		// servicesCoreAPI.setHeader('wlHost', window.location.hostname)
		waterworksAPI.setHeader('Authorization', `Bearer ${session.token}`)
		tagsServicesAPI.setHeader('Authorization', `Bearer ${session.token}`)
		// waterworksAPI.setHeader('wlHost', window.location.hostname)
		return true
	}
	catch (error) {
		return false
	}

}
setHeaders()
setToken()
