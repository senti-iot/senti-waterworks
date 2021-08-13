import { create } from 'apisauce'
import cookie from 'react-cookies'
import crypto from 'crypto'

const { REACT_APP_ENCRYPTION_KEY } = process.env
const IV_LENGTH = 16

const encrypt = (text) => {
	let iv = crypto.randomBytes(IV_LENGTH)
	let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer.from(REACT_APP_ENCRYPTION_KEY), iv)
	let encrypted = cipher.update(text)

	encrypted = Buffer.concat([encrypted, cipher.final()])

	return iv.toString('hex') + ':' + encrypted.toString('hex')
}

// let backendHost, sentiAPI
// let backendHost = 'https://senti.cloud/rest/'

// const hostname = window && window.location && window.location.hostname

// if (hostname === 'console.senti.cloud') {
// 	sentiAPI = 'https://api.senti.cloud/'
// } else if (hostname === 'beta.senti.cloud') {
// 	sentiAPI = 'https://dev.api.senti.cloud/'
// } else {
// 	backendHost = 'https://betabackend.senti.cloud/rest/'
// 	sentiAPI = 'https://dev.api.senti.cloud/'
// }
// export const loginApi = create({
// 	baseURL: backendHost,
// 	timout: 30000,
// 	headers: {
// 		'Accept': 'application/json',
// 		'Content-Type': 'application/json'
// 	}
// })
//https://dawa.aws.dk/vejnavne/autocomplete?q=vibor
export const dawaApi = create({
	baseURL: `https://dawa.aws.dk`,
	timeout: 30000,
	header: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})

// export const customerDoIApi = create({
// 	baseURL: sentiAPI + 'annual/v1',
// 	timeout: 30000,
// 	headers: {
// 		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
// 		'Accept': 'application/json',
// 		'Content-Type': 'application/json',
// 		// 'Cache-Control': 'public, max-age=86400'
// 	}
// })
/* const apiRoute = '/holidays/v1/2018-01-01/2018-12-31/da' */

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


//#region Senti Services
// const sentiServicesAPI = 'https://dev.services.senti.cloud/'
const sentiServicesAPI = process.env.REACT_APP_BACKEND
const sentiWaterWorksBackend = process.env.REACT_APP_WBACKEND


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

export const eAPI = create({
	baseURL: sentiServicesAPI + 'eventbroker',
	timeout: 30000,
	headers: {
		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
})

export const wbAPI = create({
	baseURL: sentiWaterWorksBackend,
	timeout: 30000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
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
	baseURL: sentiServicesAPI + 'data-export',
	// baseURL: 'localhost:3021',
	responseType: 'arraybuffer',
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
	// servicesCoreAPI.setHeader('wlHost', window.location.hostname)
	servicesCoreAPI.setHeader('wlHost', "waterworks.senti.io")
	waterworksAPI.setHeader('wlHost', window.location.hostname)
}
export const setToken = () => {
	try {
		let session = cookie.load('SESSION')
		servicesAPI.setHeader('Authorization', `Bearer ${session.token}`)
		servicesAPI.setHeader('appid', process.env.REACT_APP_APPID)
		servicesCoreAPI.setHeader('Authorization', `Bearer ${session.token}`)
		waterworksAPI.setHeader('Authorization', `Bearer ${session.token}`)
		tagsServicesAPI.setHeader('Authorization', `Bearer ${session.token}`)
		tagsServicesAPI.setHeader('appid', process.env.REACT_APP_APPID)
		dataExportAPI.setHeader('Authorization', `Bearer ${session.token}`)
		wbAPI.setHeader('Authorization', `Bearer ${session.token}`)
		eAPI.setHeader('Authorization', `Bearer ${session.token}`)
		return true
	}
	catch (error) {
		return false
	}

}
setHeaders()
setToken()
