import axios from 'axios'

import { REQUEST_TIMEOUT } from '../const/request-timeout'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SIDE_URL,
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
