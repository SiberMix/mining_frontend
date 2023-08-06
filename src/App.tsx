import React, { useEffect } from 'react'
import { useAppDispatch } from './redux/store'
import { setToken } from './redux/slices/authSlice'
import { useSelector } from 'react-redux'
import { getTokenSelector } from './redux/selectors/authSelectors'
import { getSettings } from './redux/slices/settingsSlice'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Auth from './components/pages/Auth/Auth'
import Main from './components/pages/Main/Main'
import Analytic from './components/pages/Analytic/Analytic'
import FieldsAnalytic from './components/pages/Analytic/modules/FieldsAnalytic/FieldsAnalytic'
import EquipsAnalytic from './components/pages/Analytic/modules/EquipsAnalytic/EquipsAnalytic'
import Notifications from './components/common/Notifications/Notifications'
import CropRotation from './components/pages/Analytic/modules/CropRotation/CropRotation'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)

  useEffect(() => {
    const tokenFromLS = localStorage.getItem('token')
    dispatch(setToken(tokenFromLS))
  }, [])

  useEffect(() => {
    if (!!token) {
      dispatch(getSettings(token))
      navigate('/monitoring')
    } else {
      navigate('/')
    }
  }, [token])

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={<Auth />}
        />
        <Route
          path='/monitoring'
          element={<Main />}
        />
        <Route
          path='/analytics'
          element={<Analytic />}
        >
          <Route
            path='field'
            element={<FieldsAnalytic />}
          />
          <Route
            path='equipments'
            element={<EquipsAnalytic />}
          />
          <Route
            path='crop_rotation'
            element={<CropRotation />}
          />
        </Route>
      </Routes>
      <Notifications />
    </div>
  )
}

export default App
