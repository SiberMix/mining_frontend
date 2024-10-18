export type AuthState = {
  token: string | null,
  setToken: (token: string | null) => void,
  getToken: (data: AuthDataForLogin, t: (key: string) => string) => Promise<void>; // Обновлено
}

export type AuthDataForLogin = {
  username: string,
  password: string
}
