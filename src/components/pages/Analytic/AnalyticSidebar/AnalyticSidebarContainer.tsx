import './AnalyticSidebarContainerCSSTransition.scss'
import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const AnalyticSidebarContainer: React.FC<Props> = () => {
  // const location = useLocation()

  return (
    <>
      {/*<TransitionGroup*/}
      {/*  component={null}*/}
      {/*  exit={false}*/}
      {/*>*/}
      {/*  <CSSTransition*/}
      {/*    key={location.key}*/}
      {/*    classNames="analytics-sidebar-fade"*/}
      {/*    timeout={300}*/}
      {/*  >*/}
      <Outlet />
      {/*  </CSSTransition>*/}
      {/*</TransitionGroup>*/}
    </>
  )
}

export default React.memo(AnalyticSidebarContainer)
