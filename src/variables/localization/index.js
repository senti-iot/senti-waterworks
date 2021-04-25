/* eslint-disable import/no-anonymous-default-export */
import en from './en.json'
import da from './da.json'
import christmasEn from './christmas.en.json'
import christmasDa from './christmas.da.json'
import chartLinesEn from './chartLinesEn.json'
import chartLinesDa from './chartLinesDa.json'
import usageDa from './usageDa.json'
import usageEn from './usageEn.json'

let combinedEn = {
	...en,
	...chartLinesEn,
	...usageEn,
	christmas: christmasEn

}
let combinedDa = {
	...da,
	...chartLinesDa,
	...usageDa,
	christmas: christmasDa
}
export default {
	en: combinedEn,
	da: combinedDa
}

