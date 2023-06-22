import s from './AnalyticLayout.module.scss'
import React from 'react'

const AnalyticLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.analyticLayout}>
      {children}
    </div>
  )
}

export default AnalyticLayout
