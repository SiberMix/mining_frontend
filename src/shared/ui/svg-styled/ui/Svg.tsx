import SVG from 'react-inlinesvg'
import styled from 'styled-components'

export const Svg = styled(SVG)<{ active?: string }>`
    height: 20px;
    width: 20px;
    margin-bottom: 25px;
    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }

    path {
        fill: ${({ active }) => (!active ? '#fff' : '#28b6fe')};
    }

    &:hover {
        path {
            fill: ${({ color }) => color || '#28b6fe'};
        }
    }
`
