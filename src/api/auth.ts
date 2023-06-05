import axios from 'axios'

export const authService = {
  /*
  * Авторизация на сервере
  * */
  login: (username: string, password: string) => {
    return axios.post('http://myhectare.ru:8000/api/v1/auth/token/login', {
      username,
      password
    })
  }
}
