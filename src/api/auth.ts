import { axiosInstance } from './abstract'

export const authService = {
  /*
  * Авторизация на сервере
  * */
  login: (username: string, password: string) => {
    return axiosInstance.post('/auth/token/login/', {
      username,
      password
    })
  }
}
