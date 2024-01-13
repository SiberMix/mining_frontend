import type { CSSProperties } from "react"
import React from "react"

type Props = {
  title: string,
  value: any,
  style?: CSSProperties | undefined
}

export const EquipPreviewRightSideInfoRow = ({
  title,
  value,
  style
}: Props) => {
  return (
    <p style={style}>
      <span className="EquipPreviewRightSide__info__name">
        {title}
      </span>
      <span className="EquipPreviewRightSide__info">
        {value}
      </span>
    </p>
  )
}
