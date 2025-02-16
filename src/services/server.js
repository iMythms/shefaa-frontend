import client from './config'

const query = async (op, url, data = []) => {
	try {
		let response
		if (op === 'post') {
			response = await client.post(url, data)
		} else if (op === 'get') {
			response = await client.get(url)
		} else if (op === 'put') {
			response = await client.put(url, data)
		} else if (op === 'delete') {
			response = await client.delete(url)
		}
		return response.data
	} catch (error) {
		return { error: error.data.error }
	}
}
export default {
	query,
}
