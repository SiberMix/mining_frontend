import './MapPlaybackSpeedController.scss'
import { StyledButton } from '../../../../../../../style/styled-components/StyledButton/StyledButton'
import Control from 'react-leaflet-custom-control'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import { memo } from 'react'

type Props = {
  isPlayerPaused: boolean
  toggleIsPlayerPaused: () => void
  setPlayerSpeed: (speed: number) => void
}

export const MapPlaybackSpeedController = memo(({
  setPlayerSpeed,
  isPlayerPaused,
  toggleIsPlayerPaused
}: Props) => {

  console.log('MapPlaybackSpeedController rerender')

  return (
    <Control position='topright'>
      <div className='MapPlaybackSpeedController'>
        <StyledButton margin={'0 2px'} onClick={toggleIsPlayerPaused}>
          {
            isPlayerPaused
              ? <CaretRightOutlined />
              : <PauseOutlined />
          }
        </StyledButton>
        <StyledButton margin={'0 2px'} onClick={() => setPlayerSpeed(20)}>
          x0.5
        </StyledButton>
        <StyledButton margin={'0 2px'} onClick={() => setPlayerSpeed(10)}>
          x1
        </StyledButton>
        <StyledButton margin={'0 2px'} onClick={() => setPlayerSpeed(5)}>
          x2
        </StyledButton>
      </div>
    </Control>
  )
})
