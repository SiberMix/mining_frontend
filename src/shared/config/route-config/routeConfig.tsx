import React from 'react'
import type { RouteObject } from 'react-router-dom'

import { Auth } from '~pages/auth'
import { Page404 } from '~pages/page404'

import Analytic from '../../../../srcOld/components/pages/Analytic/Analytic'
import CropRotation from '../../../../srcOld/components/pages/Analytic/modules/CropRotation/CropRotation'
import EquipsAnalytic from '../../../../srcOld/components/pages/Analytic/modules/EquipsAnalytic/EquipsAnalytic'
import FieldsAnalytic from '../../../../srcOld/components/pages/Analytic/modules/FieldsAnalytic/FieldsAnalytic'
import { Monitoring } from '../../../../srcOld/components/pages/Monitoring/Monitoring'

export enum AppRoutes {
  NOT_FOUND = 'not_found',

  AUTH = 'auth',
  MONITORING = 'monitoring',

  ANALYTICS = 'analytics',
  ANALYTICS_FIELD = 'analytics_field',
  ANALYTICS_EQUIPMENTS = 'analytics_equipments',
  ANALYTICS_CROP_ROTATION = 'analytics_crop_rotation'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.NOT_FOUND]: '*',

  [AppRoutes.AUTH]: '/',

  [AppRoutes.MONITORING]: '/monitoring',

  [AppRoutes.ANALYTICS]: '/analytics',
  [AppRoutes.ANALYTICS_FIELD]: '/analytics/field',
  [AppRoutes.ANALYTICS_EQUIPMENTS]: '/analytics/equipments',
  [AppRoutes.ANALYTICS_CROP_ROTATION]: '/analytics/crop_rotation'
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
    element: <Analytic />,
    children: [
      {
        path: RoutePath.analytics_field,
        element: <FieldsAnalytic />
      },
      {
        path: RoutePath.analytics_equipments,
        element: <EquipsAnalytic />
      },
      {
        path: RoutePath.analytics_crop_rotation,
        element: <CropRotation />
      }
    ]
  }
]
