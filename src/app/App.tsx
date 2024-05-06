import './styles/index.scss'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { WithAuthCheck } from '~app/hocs/withAuthTokenCheck'
import { getTokenSelector } from '~processes/redux/selectors/authSelectors'
import { getSettings } from '~processes/redux/slices/settingsSlice'
import { useAppDispatch } from '~processes/redux/store'
import { routeConfig, RoutePath } from '~shared/config/route-config'
import { AppVersion } from '~shared/ui/app-version'
import { Header } from '~widgets/header'
import { Notifications } from '~widgets/notifications'
import { Settings } from '~widgets/settings'

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
            const isLoginPage = route.path !== RoutePath.auth

            const elementWithHOCs = isLoginPage
              ? (<>
                <Header />
                <WithAuthCheck element={route.element} />
              </>)
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
      <Settings />
      <Notifications />
      <AppVersion />
    </div>
  )
}

export default App
