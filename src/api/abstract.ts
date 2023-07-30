import axios from 'axios'

/**
 * Таймаут ожидания ответа (мс)
 */
const REQUEST_TIMEOUT = 8000
const SUPER_REQUEST_TIMEOUT = 16000

const axiosInstance = axios.create({
  baseURL: 'http://myhectare.ru:8000/api/v1',
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Token ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const axiosInstanceWithoutV1 = axios.create({
  baseURL: 'http://myhectare.ru:8001/api/v1/',
  // timeout: SUPER_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstanceWithoutV1.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Token ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { axiosInstance, axiosInstanceWithoutV1 }

