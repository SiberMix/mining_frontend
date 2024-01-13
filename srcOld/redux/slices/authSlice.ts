import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { authService } from "../../api/auth"

type AuthInitialState = {
  token: string | null
}

const authInitialState: AuthInitialState = {
  token: localStorage.getItem("token") || null
  // токен на случай какого то пиздеца '6126e8c08dbcb7cef6e4294b9eb76df6e46dc769'
}

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setToken: (state: AuthInitialState, action) => {
      state.token = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.fulfilled, (state: AuthInitialState, action) => {
        state.token = action.payload.data.auth_token
        localStorage.setItem("token", action.payload.data.auth_token)
      })
      .addDefaultCase(() => {
      })
  }
})

export const getToken = createAsyncThunk(
  "auth/getToken",
  async ({
    username,
    password
  }: AuthDataForLogin) => {
    return toast.promise(authService.login(username, password), {
      pending: "Аутентификация...",
      success: "Успешная аутентификация",
      error: "Ошибка аутентификации"
    })
  }
)

const {
  reducer,
  actions
} = authSlice

export const {
  setToken
} = actions

export default reducer

type AuthDataForLogin = {
  username: string,
  password: string
}
