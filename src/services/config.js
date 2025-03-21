import axios from 'axios'

const client = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
})

client.interceptors.request.use((config) => {
	const token = localStorage.getItem('authToken')
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`
	}
	return config
})

client.interceptors.response.use(
	(response) => response,
	(error) => {
		let response
		if (error.response) {
			response = error.response
		} else {
			response = error
		}
		return Promise.reject(response)
	}
)
export default client
