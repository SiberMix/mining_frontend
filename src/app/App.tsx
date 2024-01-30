import './styles/index.scss'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { WithAuthCheck } from '~app/hocs/withAuthTokenCheck/withAuthTokenCheck'
import { routeConfig, RoutePath } from '~shared/config/route-config'
import { AppVersion } from '~shared/ui/app-version'
import { Notifications } from '~widgets/notifications'

import { getTokenSelector } from '../../srcOld/redux/selectors/authSelectors'
import { getSettings } from '../../srcOld/redux/slices/settingsSlice'
import { useAppDispatch } from '../../srcOld/redux/store'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const token = useSelector(getTokenSelector)

  useEffect(() => {
    if (token) {
      dispatch(getSettings(token))
    }
  }, [token])

  return (
    <div className='app'>
      <Routes>
        {Object.values(routeConfig)
          .map(route => {
            // Оборачиваем в проверку токена все страницы кроме логина
            const elementWithHOCs = route.path !== RoutePath.auth
              ? <WithAuthCheck element={route.element} />
              : route.element

            return (
              <Route
                key={route.path}
                path={route.path}
                element={elementWithHOCs}
                children={route.children?.map(childrenRoute => (
                  <Route
                    key={childrenRoute.path}
                    path={childrenRoute.path}
                    element={<WithAuthCheck element={childrenRoute.element} />}
                  />
                ))}
              />
            )
          })}
      </Routes>
      <Notifications />
      <AppVersion />
    </div>
  )
}

export default App
