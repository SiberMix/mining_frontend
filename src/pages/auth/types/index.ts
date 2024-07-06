export type AuthState = {
  token: string | null,
  setToken: (token: string | null) => void,
  getToken: (data: AuthDataForLogin) => void
}

export type AuthDataForLogin = {
  username: string,
  password: string
}
