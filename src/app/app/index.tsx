import './styles/index.scss'

import React from 'react'

import { AppVersion } from '~shared/ui/app-version'
import { ModalsCenter } from '~widgets/modals-center'
import { Notifications } from '~widgets/notifications'
import { Settings } from '~widgets/settings'

import { AppRouter } from './app-router'

const App: React.FC = () => {
  return (
    <div className='app'>
      <AppRouter />
      <Settings />
      <Notifications />
      <ModalsCenter />
      <AppVersion />
    </div>
  )
}

export default App
