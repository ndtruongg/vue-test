import axios from 'axios'

const callApi = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  }
})

callApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('local')
    if (token) {
      config.headers.common['Accept'] = 'application/json'
      config.headers.common['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default callApi
