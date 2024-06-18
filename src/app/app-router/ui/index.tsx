import { Route, Routes } from 'react-router-dom'

import { WithAuthCheck } from '~app/hocs/withAuthTokenCheck'
import { routeConfig, RoutePath } from '~shared/config/route-config'
import { Header } from '~widgets/header'

export const AppRouter = () => {
  return (
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
            >
              {route.children?.map(childrenRoute => (
                <Route
                  key={childrenRoute.path}
                  path={childrenRoute.path}
                  element={<WithAuthCheck element={childrenRoute.element} />}
                />
              ))}
            </Route>
          )
        })}
    </Routes>
  )
}
