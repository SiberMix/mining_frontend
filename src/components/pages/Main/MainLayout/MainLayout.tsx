import s from './MainLayout.module.scss'
import React from 'react'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.mainLayout}>
      {children}
    </div>
  )
}

export default MainLayout
