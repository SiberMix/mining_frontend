import { InfoCircleOutlined } from '@ant-design/icons'
import type { CSSProperties } from 'react'
import styled from 'styled-components'

type Props = {
  color?: CSSProperties['backgroundColor'],
  active_сolor?: CSSProperties['backgroundColor'],
  styledmargin?: CSSProperties['margin'],
  height?: CSSProperties['height'],
  width?: CSSProperties['width']
}

export const MoreInfo = styled(InfoCircleOutlined)<Props>`
    margin: ${({ styledmargin }) => styledmargin ? styledmargin : ''};
    cursor: pointer;
    color: ${({ color }) => color ? color : '#28b6fe'};
    transition: color .3s;

    &:hover {
        color: ${({ active_сolor }) => active_сolor ? active_сolor : '#ffffff'};
    }
`
