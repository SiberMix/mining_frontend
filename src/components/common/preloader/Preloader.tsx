import s from './preloader.module.scss'
import React from 'react'
import * as cn from 'classnames'

const Preloader = () => {
  return (
    <div className={cn(s.preloader)}>
      <div className={cn(s.preloaderText)}>
        <div className={cn(s.preloaderBG)}>
          <div className={cn(s.scene)}>
            <div className={cn(s.cubeWrapper)}>
              <div className={cn(s.cube)}>
                <div className={cn(s.cubeFaces)}>
                  <div className={cn(s.cubeFace, s.shadow)} />
                  <div className={cn(s.cubeFace, s.bottom)} />
                  <div className={cn(s.cubeFace, s.top)} />
                  <div className={cn(s.cubeFace, s.left)} />
                  <div className={cn(s.cubeFace, s.right)} />
                  <div className={cn(s.cubeFace, s.back)} />
                  <div className={cn(s.cubeFace, s.front)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        Loading...
      </div>
    </div>
  )
}

export default Preloader
