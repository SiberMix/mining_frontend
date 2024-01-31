import { Button } from 'antd'
import type { CSSProperties } from 'react'
import styled from 'styled-components'

type StyledButtonProps = {
  width?: CSSProperties['width'],
  margin?: CSSProperties['margin'],
  height?: CSSProperties['height'],
  border?: CSSProperties['border'],
  hoverborder?: CSSProperties['border'],
  bgc?: CSSProperties['backgroundColor'],
  hoverbgc?: CSSProperties['backgroundColor'],
  color?: CSSProperties['color'],
  hovercolor?: CSSProperties['color']
}

export const StyledButton = styled(Button)<StyledButtonProps>`
  margin: ${({ margin }) => margin ? margin : ''};

  width: ${({ width }) => width ? width : '100%'};
  height: ${({ height }) => height ? height : '100%'};

  color: ${({ color }) => color ? color : '#929292'};

  border: ${({ border }) => border ? border : '1px solid var(--gray-100)'};

  background-color: ${({ bgc }) => bgc ? bgc : '#565656'};

  transition: background-color, color .3s;

  &:hover {
    color: ${({ hovercolor }) => hovercolor ? hovercolor : '#FFFFFF'} !important; //в некоторых файлах почему то перебиваются стили
    border: ${({ hoverborder }) => hoverborder ? hoverborder : '1px solid var(--gray-100)'} !important; //и тут тоже
    background-color: ${({ hoverbgc }) => hoverbgc ? hoverbgc : 'var(--gray-100)'} !important; //и тут тоже
  }
`
