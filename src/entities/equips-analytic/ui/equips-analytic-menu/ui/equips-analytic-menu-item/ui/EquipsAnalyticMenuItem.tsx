import './EquipsAnalyticMenuItem.scss'

import type { CSSProperties, PropsWithChildren } from 'react'
import React, { memo } from 'react'

type EquipsAnalyticMenuItemProps = {
  title?: string,
  subTitle?: string,
  gridRow?: CSSProperties['gridRow'],
  gridColumn?: CSSProperties['gridColumn'],
  style?: CSSProperties
} & PropsWithChildren

export const EquipsAnalyticMenuItem = memo(({
  title,
  subTitle,
  gridRow,
  gridColumn,
  style,
  children
}: EquipsAnalyticMenuItemProps) => {

  const subTitleNode = subTitle
    ? (<span>
      {subTitle}
    </span>)
    : null

  return (
    <div
      className='EquipsAnalyticMenuItem'
      style={{
        gridRow,
        gridColumn,
        ...style
      }}
    >
      {
        title
          ? <div className='EquipsAnalyticMenuItem_title'>
            {title}
            {subTitleNode}
          </div>
          : null
      }
      {children}
    </div>
  )
})
