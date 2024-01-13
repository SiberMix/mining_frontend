import "./MonitoringLayout.scss"

import React from "react"

const MonitoringLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="MonitoringLayout">
      {children}
    </div>
  )
}

export default MonitoringLayout
