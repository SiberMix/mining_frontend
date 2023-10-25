import styled from 'styled-components'
import { InfoCircleOutlined } from '@ant-design/icons'
import { CSSProperties } from 'react'

type Props = {
  color?: CSSProperties['backgroundColor']
  activeColor?: CSSProperties['backgroundColor']
  styledmargin?: CSSProperties['margin']
  height?: CSSProperties['height']
  width?: CSSProperties['width']
}

export const MoreInfo = styled(InfoCircleOutlined)<Props>`
  margin: ${({ styledmargin }) => styledmargin ? styledmargin : ''};
  cursor: pointer;
  color: ${({ color }) => color ? color : '#28b6fe'};
  transition: color .3s;

  &:hover {
    color: ${({ activeColor }) => activeColor ? activeColor : '#ffffff'};
  }
`
