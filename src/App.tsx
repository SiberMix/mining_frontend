import React, {
  lazy,
  Suspense,
  useEffect
} from 'react'
import { useAppDispatch } from './redux/store'
import { setToken } from './redux/slices/authSlice'
import { useSelector } from 'react-redux'
import { getTokenSelector } from './redux/selectors/authSelectors'
import { getSettings } from './redux/slices/settingsSlice'
import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'
import Auth from './components/pages/Auth/Auth'
import Main from './components/pages/Main/Main'
import Analytic from './components/pages/Analytic/Analytic'
import FieldsAnalytic from './components/pages/Analytic/modules/FieldsAnalytic/FieldsAnalytic'
import EquipsAnalytic from './components/pages/Analytic/modules/EquipsAnalytic/EquipsAnalytic'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)
  useEffect(() => {
    dispatch(setToken(localStorage.getItem('token') || ''))
    dispatch(getSettings(localStorage.getItem('token') || ''))
  }, [])

  useEffect(() => {
    if (token) {
      navigate('/monitoring')
    }
  }, [token])

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<Auth />}
        />
        <Route
          path="/monitoring"
          element={<Main />}
        />
        <Route
          path="/analytics"
          element={<Analytic />}
        >
          <Route
            path="field"
            element={<FieldsAnalytic />}
          />
          <Route
            path="equipments"
            element={<EquipsAnalytic />}
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
