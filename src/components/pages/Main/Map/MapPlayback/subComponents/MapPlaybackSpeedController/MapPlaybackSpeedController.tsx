import "./MapPlaybackSpeedController.scss"

import {
  CaretRightOutlined,
  PauseOutlined
} from "@ant-design/icons"
import { memo } from "react"
import Control from "react-leaflet-custom-control"

import {
  StyledButton
} from "../../../../../../../style/styled-components/StyledButton/StyledButton"

type Props = {
  isPlayerPaused: boolean,
  toggleIsPlayerPaused: () => void,
  setPlayerSpeed: (speed: number) => void,
  progressForProgressBar?: number | string | undefined
}

export const MapPlaybackSpeedController = memo(({
  setPlayerSpeed,
  isPlayerPaused,
  toggleIsPlayerPaused,
  progressForProgressBar
}: Props) => {

  return (
    <Control position="topright">
      <div className="MapPlaybackSpeedController">
        <div className="MapPlaybackSpeedController__controller">
          <StyledButton
            margin="0 2px"
            onClick={toggleIsPlayerPaused}
            bgc="#FFFFFF"
            hoverbgc="#FFFFFF"
            hovercolor="#565656"
          >
            {
              isPlayerPaused
                ? <CaretRightOutlined />
                : <PauseOutlined />
            }
          </StyledButton>
          <StyledButton
            margin="0 2px"
            onClick={() => setPlayerSpeed(20)}
            bgc="#FFFFFF"
            hoverbgc="#FFFFFF"
            hovercolor="#565656"
          >
            x0.5
          </StyledButton>
          <StyledButton
            margin="0 2px"
            onClick={() => setPlayerSpeed(10)}
            bgc="#FFFFFF"
            hoverbgc="#FFFFFF"
            hovercolor="#565656"
          >
            x1
          </StyledButton>
          <StyledButton
            margin="0 2px"
            onClick={() => setPlayerSpeed(5)}
            bgc="#FFFFFF"
            hoverbgc="#FFFFFF"
            hovercolor="#565656"
          >
            x2
          </StyledButton>
        </div>
        {
          progressForProgressBar
            ? <div className="MapPlaybackSpeedController__progressbar__wrapper">
              <div
                className="MapPlaybackSpeedController__progressbar"
                style={{ width: progressForProgressBar + "%" }}
              >
                {progressForProgressBar + "%"}
              </div>
            </div>
            : null
        }
      </div>
    </Control>
  )
})
