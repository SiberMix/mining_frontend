import axios from 'axios'

/**
 * Таймаут ожидания ответа (мс)
 */
const REQUEST_TIMEOUT = 8000

export const axiosInstance = axios.create({
  baseURL: 'http://myhectare.ru:8000/api/v1',
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('token') || ''
  }
})
