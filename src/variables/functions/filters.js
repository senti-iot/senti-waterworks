import moment from 'moment'
/**
 * Date Formatter 'LL' format
 * @param {Date} date
 */
export const dateFormatter = (date) => {
	var a = moment(date).format('LL')
	return a
}

const isObject = (obj) => {
	return obj === Object(obj)
}

export const keyTester = (obj, sstr) => {
	let searchStr = sstr.toLowerCase()
	let found = false
	if (isObject(obj)) {
		for (var k in obj) {
			if (!found) {
				if (k instanceof Date) {
					let date = dateFormatter(obj[k])
					found = date.toLowerCase().includes(searchStr)
				}
				else {
					if (isObject(obj[k])) {
						found = keyTester(obj[k], sstr)
					}
					else {
						found = obj[k] ? obj[k].toString().toLowerCase().includes(searchStr) : false
					}
				}
			}
			else {
				break
			}
		}
	}
	else {
		found = obj ? obj.toString().toLowerCase().includes(searchStr) : null
	}
	return found
}

export const filterItems = (data, filters) => {
	const { activeDateFilter, keyword } = filters
	var arr = data
	if (activeDateFilter)
		arr = filterByDate(arr, filters)
	if (arr) {
		if (arr[0] === undefined)
			return []
		var keys = Object.keys(arr[0])
		var filtered = arr.filter(c => {
			var contains = keys.map(key => {
				if (c)
					return keyTester(c[key], keyword ? keyword : '')
				return false

			})
			return contains.indexOf(true) !== -1 ? true : false
		})
		return filtered
	}
}

const _ = require('lodash')
const index = (obj, is) => {
	let newA = _.get(obj, is) !== undefined ? _.get(obj, is) : undefined
	return newA
}
const filterByDate = (items, k) => {
	return items = items.reduce((newArr, d) => {
		let objVal = index(d, k.key)
		if (objVal)
			if (k.value.after) {
				if (moment(objVal).isAfter(moment(k.value.date)))
					newArr.push(d)
			}
			else {
				if (moment(objVal).isBefore(moment(k.value.date)))
					newArr.push(d)
			}
		return newArr
	}, [])
}

const filterByString = (items, k) => {
	if (k.key === "") {
		return items = filterItems(items, { keyword: k.value })
	}
	else {
		items = items.reduce((newArr, d) => {
			let objVal = index(d, k.key)//?
			if (objVal !== null && objVal !== undefined) {
				if (objVal.toString().toLowerCase().includes(k.value.toString().toLowerCase()))//?
				{
					// console.log(d)
					let newD = d
					newArr.push(newD)
				}
				if (Array.isArray(objVal)) {
					if (objVal[0] === undefined) { return newArr }

					var keys = Object.keys(objVal[0])
					objVal.filter(c => {
						return keys.map(key => {
							if (c) {
								let res = keyTester(c[key], k.value)
								if (res) {
									newArr.push(d)
								}
							}
							return newArr
						})
					})
				}
				if (objVal.hasOwnProperty(k.value)) {
					newArr.push(d)
				}

			}
			// console.log(newArr)
			return newArr
		}, [])
		// console.log(items)
		return items
	}
}

const filterByDiff = (items, k) => {
	items = items.reduce((newArr, d) => {
		let objVal = index(d, k.key)
		if (k.value.diff) {
			if (k.value.values.false.indexOf(objVal) === -1)
				newArr.push(d)
		}
		else {
			if (k.value.values.false.indexOf(objVal) !== -1)
				newArr.push(d)
		}
		return newArr
	}, [])
	return items
}

// export const customFilterItems = (items, keyValues) => {
// 	keyValues.forEach(k => {
// 		switch (k.type) {
// 			case 'string':
// 			case 'dropDown':
// 			case null:
// 				items = filterByString(items, k)
// 				break;
// 			case 'date':
// 				items = filterByDate(items, k)
// 				break;
// 			case 'diff':
// 				items = filterByDiff(items, k)
// 				break;
// 			default:
// 				break;
// 		}
// 	})
// 	return items
// }
export const customFilterItems = (itm, keyValues) => {
	let ORItems = null
	let items = itm
	const filterItem = (k, items) => {
		switch (k.type) {
			case 'string':
			case 'dropDown':
			case null:
				return filterByString(items, k)
			case 'date':
				return filterByDate(items, k)
			case 'diff':
				return filterByDiff(items, k)
			default:
				break
		}
	}
	keyValues.forEach(k => {
		if (k.filterType === 'OR') {
			ORItems = items
			let filtered = filterItem(k, itm)
			items = [...ORItems, ...filtered]
			items = items.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
		}
		if (k.filterType === 'AND') {
			items = filterItem(k, items)
		}
	})
	return items
}

const suggestionSlicer = (obj) => {
	var arr = []
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			var innerObj = {}
			if (typeof obj[prop] === 'object') {
				arr.push(...suggestionSlicer(obj[prop]))
			}
			else {
				innerObj = {
					id: prop.toString().toLowerCase(),
					label: obj[prop] ? obj[prop].toString() : ''
				}
				arr.push(innerObj)
			}
		}
	}
	return arr
}

export const suggestionGen = (arrayOfObjs) => {
	let arr = []
	arrayOfObjs.forEach(obj => {
		arr.push(...suggestionSlicer(obj))
	})
	arr = _.uniqBy(arr, 'label')
	return arr
}