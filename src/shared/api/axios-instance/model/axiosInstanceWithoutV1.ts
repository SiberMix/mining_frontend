import axios from 'axios'

export const axiosInstanceWithoutV1 = axios.create({
  baseURL: import.meta.env.VITE_ANALYTIC_SIDE_URL,
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
