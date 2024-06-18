import type { CSSProperties } from 'react'
import styled from 'styled-components'

type SideOutLayoutProps = {
  position?: CSSProperties['position'],
  $width?: CSSProperties['width']
}

export const SideOutLayout = styled.div<SideOutLayoutProps>`
    position: ${({ position }) => position ? position : 'absolute'};

    ${({ position }) => {
    if (position === 'absolute' || !position) {
      return `
          top: 0;
          bottom: 0;
          left: calc(var(--sidebar-width) - 1px); //1px bug
      `
    }
  }}

    overflow-y: scroll;
    z-index: 10;

    width: ${({ $width }) => $width ? `calc(${$width} - var(--sidebar-width))` : '410px'};
    height: calc(100vh - var(--header-height));
    padding: 1px;
    background-color: var(--gray-600);
    border-width: 0.5px;
    max-height: 100vh;
    scrollbar-width: none; /* hide the scrollbar in Firefox */
    -ms-overflow-style: none; /* hide the scrollbar in Edge and IE */

    &::-webkit-scrollbar {
        width: 0.5rem; /* set the width of the scrollbar */
    }

    &::-webkit-scrollbar-track {
        background-color: var(--gray-500); /* set the color of the track */
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--gray-700); /* set the color of the thumb */
    }
`
