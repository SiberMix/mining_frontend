import { createSlice } from '@reduxjs/toolkit'

type AuthInitialState = {
  token: string | null
}

const authInitialState: AuthInitialState = {
  token: null
  // токен на случай какого то пиздеца '6126e8c08dbcb7cef6e4294b9eb76df6e46dc769'
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setToken: (state: AuthInitialState, action) => {
      state.token = action.payload
    }
  }
})

const {
  reducer,
  actions
} = authSlice

export const {
  setToken
} = actions

export default reducer
