import axios from 'axios'

export const authService = {
  /*
  * Авторизация на сервере
  * */
  login: (data: {username: string, password: string}) => {
    return axios.post('http://109.111.187.147:8000/api/v1/auth/token/login', data)
  }
}
