import './MapPlaybackSpeedController.scss'

import { CaretRightOutlined, PauseOutlined, RetweetOutlined } from '@ant-design/icons'
import type { TabsProps } from 'antd'
import { Radio } from 'antd'
import { memo } from 'react'

import { formatDate } from '~shared/lib/format-date'
import { StyledButton } from '~shared/ui/button-styled'

type Props = {
  playerSpeed: number,
  isPlayerPaused: boolean,
  toggleIsPlayerPaused: () => void,
  setPlayerSpeed: (speed: number) => void,
  progressForProgressBar?: number | string | undefined,
  timeStamp: number,
  isPlaybackEnd: boolean,
  replayPlayback: () => void
}

export const MapPlaybackSpeedController = memo(({
  setPlayerSpeed,
  isPlayerPaused,
  toggleIsPlayerPaused,
  progressForProgressBar,
  timeStamp,
  isPlaybackEnd,
  replayPlayback,
  playerSpeed
}: Props) => {

  const buttonHandler = () => {
    if (isPlaybackEnd) {
      replayPlayback()
    } else {
      toggleIsPlayerPaused()
    }
  }

  return (
    <div className='MapPlaybackSpeedController'>
      <div className='MapPlaybackSpeedController__controller'>
        <StyledButton
          margin='0 2px'
          onClick={buttonHandler}
          bgc='#FFFFFF'
          hoverbgc='#FFFFFF'
          hovercolor='#565656'
        >
          {
            isPlaybackEnd
              ? <RetweetOutlined />
              : isPlayerPaused
                ? <CaretRightOutlined />
                : <PauseOutlined />
          }
        </StyledButton>
        <Radio.Group
          className='MapPlaybackSpeedController__controller__radio'
          value={playerSpeed}
          onChange={(e) => setPlayerSpeed(e.target.value)}
        >
          <Radio.Button value={20}>
            x0.5
          </Radio.Button>
          <Radio.Button value={10}>
            x1
          </Radio.Button>
          <Radio.Button value={5}>
            x2
          </Radio.Button>
        </Radio.Group>
        <div className='MapPlaybackSpeedController__controller__time'>
          {`Время: ${formatDate(timeStamp)}`}
        </div>
      </div>
      {
        progressForProgressBar
          ? <div className='MapPlaybackSpeedController__progressbar__wrapper'>
            <div
              className='MapPlaybackSpeedController__progressbar'
              style={{ width: progressForProgressBar + '%' }}
            >
              {progressForProgressBar + '%'}
            </div>
          </div>
          : null
      }
    </div>
  )
})

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3'
  }
]
