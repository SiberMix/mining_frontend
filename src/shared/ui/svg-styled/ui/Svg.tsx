import type { CSSProperties } from 'react'
import SVG from 'react-inlinesvg'
import styled from 'styled-components'

type SvgProps = {
  active?: string,
  $height?: CSSProperties['height'],
  $width?: CSSProperties['width'],
  $color?: CSSProperties['color'],
  activeColor?: CSSProperties['color']
}

export const Svg = styled(SVG)<SvgProps>`
    height: ${({ $height }) => $height ? $height : '20px'};
    width: ${({ $width }) => $width ? $width : '20px'};
    margin-bottom: 25px;
    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }

    path {
        fill: ${({
    active,
    $color,
    activeColor
  }) => active
    ? activeColor || '#28b6fe'
    : $color || '#fff'
};
    }

    &:hover {
        path {
            fill: ${({ activeColor }) => activeColor || '#28b6fe'};
        }
    }
`
