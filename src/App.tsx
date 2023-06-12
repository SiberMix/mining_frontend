import React, { useEffect } from 'react'
import { Main } from './components/pages/Main'
import { Auth } from './components/pages/Auth'
import { useAppDispatch } from './redux/store'
import { setToken } from './redux/slices/authSlice'
import { useSelector } from 'react-redux'
import { getTokenSelector } from './redux/selectors/authSelectors'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const token = useSelector(getTokenSelector)
  useEffect(() => {
    dispatch(setToken(localStorage.getItem('token') || ''))
  }, [])

  return (
    <div className="app">
      {!token
        ? (
          <Auth />
        )
        : (
          <Main />
        )}
    </div>
  )
}

export default App
