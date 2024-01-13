import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import {
  Route,
  Routes
} from "react-router-dom"

import Notifications from "./components/common/Notifications/Notifications"
import { WithAuthCheck } from "./hocs/withAuthTokenCheck/withAuthTokenCheck"
import { getTokenSelector } from "./redux/selectors/authSelectors"
import { getSettings } from "./redux/slices/settingsSlice"
import { useAppDispatch } from "./redux/store"
import {
  routeConfig,
  RoutePath
} from "./shared/consfigs/RouteConfig/RouteConfig"

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const token = useSelector(getTokenSelector)

  useEffect(() => {
    if (token) {
      dispatch(getSettings(token))
    }
  }, [token])

  return (

    <div className="app">
      <Routes>
        {Object.values(routeConfig)
          .map(route => {
            // Оборачиваем в проверку токена все страницы кроме логина
            const elementWithHOCs = route.path !== RoutePath.auth
              ? <WithAuthCheck element={route.element} /> //todo исправиль ошибку, вообще хз откуда она тк работает все корректно именно в таком варианте
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
    </div>
  )
}

export default App
