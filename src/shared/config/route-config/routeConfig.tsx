import React from 'react'
import type { RouteObject } from 'react-router-dom'

import Analytic from '~pages/analytic/Analytic'
import { Auth } from '~pages/auth'
import Monitoring from '~pages/monitoring/Monitoring'
import { Page404 } from '~pages/page404'

export enum AppRoutes {
  NOT_FOUND = 'not_found',
  AUTH = 'auth',
  MONITORING = 'monitoring',
  ANALYTICS = 'analytics'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.NOT_FOUND]: '*',

  [AppRoutes.AUTH]: '/',

  [AppRoutes.MONITORING]: '/monitoring',

  [AppRoutes.ANALYTICS]: '/analytics'
}

export const routeConfig: RouteObject[] = [
  {
    path: RoutePath.not_found,
    element: <Page404 />
  },
  {
    path: RoutePath.auth,
    element: <Auth />
  },
  {
    path: RoutePath.monitoring,
    element: <Monitoring />
  },
  {
    path: RoutePath.analytics,
    element: <Analytic />
  }
]
