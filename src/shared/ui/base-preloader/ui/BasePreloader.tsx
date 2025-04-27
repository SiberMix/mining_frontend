import './BasePreloader.scss'

import type { CSSProperties } from 'react'
import React, { memo } from 'react'

type BasePreloaderProps = {
  position?: 'relative',
  height?: CSSProperties['height'],
  width?: CSSProperties['width'],
  opacity?: CSSProperties['opacity']
}

export const BasePreloader = memo((props: BasePreloaderProps) => {
  return (
    <div
      className='loading'
      style={props}
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
