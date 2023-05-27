import s from './preloader.module.scss'
import React from 'react'
import * as cn from 'classnames'

const Preloader = () => {
  return (
    <div className={cn(s.preloader)}>
      <div className={cn(s.preloaderText)}>
        Loading...
      </div>
    </div>
  )
}

export default Preloader
