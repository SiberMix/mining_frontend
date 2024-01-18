import './AppVersion.scss'

import React from 'react'

import { APP_VERSION } from '../const/version'

export const AppVersion = () => {
  return (
    <div className='AppVersion'>
      v
      {APP_VERSION}
    </div>
  )
}
