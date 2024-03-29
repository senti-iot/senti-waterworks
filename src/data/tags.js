import { tagsServicesAPI } from 'data/data'


/**
 * @desc Create a new tag
 * @param {Object} t - Complete tag object
 * @param {UUIDv4} t.resourceUUID - Resource UUID to which the tag is tied to
 * @param {Number} t.resourceType - Resource type id matching the ACL types
 * @param {Object} t.tag - Tag object
 * @param {String} t.tag.name - Tag name
 * @param {String} t.tag.color - Hex color string
 * @param {String} t.tag.description - Tag description
 */
export const createTag = async t => {
	let response = await tagsServicesAPI.post('/create', t).then(rs => rs.ok ? rs.data : rs.ok)
	// let response = false
	return response
}

/**
 * @desc edit base tag
 * @param {Object} t - Tag object
 * @param {UUIDv4} t.uuid - Tag UUID
 * @param {String} t.name - Tag name
 * @param {String} t.color - Hex color string
 * @param {String} t.description - Tag description
 */
export const editTag = async t => {
	let response = await tagsServicesAPI.post('/edit', t).then(rs => rs.ok ? rs.data : rs.ok)
	return response
}
/**
 * @desc delete base tag
 */
export const deleteTag = async uuid => {
	let response = await tagsServicesAPI.delete('/delete/' + uuid).then(rs => rs.ok ? rs.data : rs.ok)
	return response
}
/**
 * @desc Get all tags
 * @param
 */
export const getAllTags = async () => {
	let response = await tagsServicesAPI.get('/tags').then(rs => rs.ok ? rs.data : [])
	return response
}


/**
 * @param {Object} resources
 * @param {uuidv4} resources.tagUUID
 * @param {Array.<{resourceUUID: uuidv4, resourceType: Number }>} resources - Resources
 */

export const addTagToResources = async resources => {
	let response = await tagsServicesAPI.post('/add', resources).then(rs => rs.ok ? rs.data : rs.ok)
	return response
}

/**
 * @param {Object} resources
 * @param {Array.<uuidv4>} resources.tagUUIDs
 * @param {Array.<{resourceUUID: uuidv4, resourceType: Number }>} resources - Resources
 */

export const replaceTagsToResources = async resources => {
	let response = await tagsServicesAPI.post('/replace', resources).then(rs => rs.ok ? rs.data : rs.ok)
	return response
}
