import './BasePreloader.scss'

import React, { memo } from 'react'

type BasePreloaderProps = {
  position?: 'relative',
  height?: string,
  width?: string
}

export const BasePreloader = memo(({
  width,
  height,
  position
}: BasePreloaderProps) => {
  return (
    <div
      className='loading'
      style={{
        position: position,
        width: width,
        height: height
      }}
    >
      <div className='loading-text'>
        <span className='loading-text-words'>
          H
        </span>
        <span className='loading-text-words'>
          E
        </span>
        <span className='loading-text-words'>
          C
        </span>
        <span className='loading-text-words'>
          T
        </span>
        <span className='loading-text-words'>
          A
        </span>
        <span className='loading-text-words'>
          R
        </span>
        <span className='loading-text-words'>
          E
        </span>
      </div>
    </div>
  )
})
