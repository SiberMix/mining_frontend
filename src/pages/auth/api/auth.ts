import axios from 'axios'

export const authService = {
  /*
  * Авторизация на сервере
  * */
  login: (data: {username: string, password: string}) => {
    return axios.post('http://127.0.0.1:8000/api/v1/auth/token/login', data)
  }
}
