import type { CSSProperties } from 'react'
import React, { memo } from 'react'

type EquipPreviewRightSideInfoRowProps = {
  title: string,
  value: any,
  style?: CSSProperties | undefined
}

export const EquipPreviewRightSideInfoRow = memo(({
  title,
  value,
  style
}: EquipPreviewRightSideInfoRowProps) => {
  return (
    <p style={style}>
      <span className='EquipPreviewRightSide__info__name'>
        {title}
      </span>
      <span className='EquipPreviewRightSide__info'>
        {value}
      </span>
    </p>
  )
})
