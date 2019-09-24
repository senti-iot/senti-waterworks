import React, { useReducer } from 'react'
import { localization, initialLocState } from 'Redux/localization';

export const TProvider = React.createContext(null)

const LocalizationProvider = ({ children }) => {
	const [locState] = useReducer(localization, initialLocState)
	let langStrings = locState.s

	var replace = String.prototype.replace
	var dollarRegex = /\$/g
	var dollarBillsYall = '$$'
	var defaultTokenRegex = /%\{(.*?)\}/g
	var has = require('has')

	const transformPhrase = (phrase, substitutions, tokenRegex) => {
		if (typeof phrase !== 'string') {
			throw new TypeError('TProvider.transformPhrase expects argument #1 to be string')
		}

		if (substitutions == null) {
			return phrase
		}
		var result = phrase
		var interpolationRegex = tokenRegex || defaultTokenRegex
		var options = typeof substitutions === 'number' ? { smart_count: substitutions } : substitutions
		result = replace.call(result, interpolationRegex,
			function (expression, argument) {
				if (!has(options, argument) || options[argument] == null) {
					return expression
				}
				return replace.call(options[argument], dollarRegex, dollarBillsYall)
			})
		if (substitutions.type === 'markdown')
			return null
		// return <ReactMarkdown source={result} />
		else {
			return result
		}
	}

	const t = (key, options) => {
		var phrase, result
		var opts = options == null ? {} : options
		if (typeof langStrings[key] === 'string') {
			phrase = langStrings[key]
		} else if (typeof opts._ === 'string') {
			phrase = opts._
		} /* else if (this.onMissingKey) {
			var onMissingKey = this.onMissingKey
			result = onMissingKey(key, opts, this.tokenRegex)
		} */ else {
			console.info('Missing key: "' + key + '"')
			result = key
		}
		if (typeof phrase === 'string') {
			result = transformPhrase(phrase, opts)
		}
		return result
	}
	return (
		<TProvider.Provider value={t}>
			{children}
		</TProvider.Provider>

	)
}

export default LocalizationProvider
