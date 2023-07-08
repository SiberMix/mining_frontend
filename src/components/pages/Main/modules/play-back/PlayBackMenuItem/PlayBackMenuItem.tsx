import './PlayBackMenuItem.scss'
import React, { useState } from 'react'
import TrashBox from '/src/assets/icons/delete.svg'
import EditBox from '/src/assets/icons/edit.svg'
import {
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons'

type Props = {
  id: number,
  index: number,
  items: string[]
}

const PlayBackMenuItem: React.FC<Props> = ({
  items,
  index,
  id
}) => {

  const [isWatching, setIsWatching] = useState(false)

  const toggleIsWatching = () => {
    setIsWatching(isWatching => !isWatching)
  }

  return (
    <div className="PlayBackMenuItem">
      <div className="PlayBackMenuItem__info">
        <span className="PlayBackMenuItem__info-name">
          {`Playback #${index + 1}`}
        </span>
        <span className="PlayBackMenuItem__info-equips">
          {items.join(', ')}
        </span>
      </div>
      <div className="PlayBackMenuItem__icons">
        {
          isWatching
            ? <EyeOutlined
              className="PlayBackMenuItem__icons-item"
              style={{ color: '#ffffff' }}
              onClick={toggleIsWatching}
            />
            : <EyeInvisibleOutlined
              className="PlayBackMenuItem__icons-item"
              style={{ color: '#848484' }}
              onClick={toggleIsWatching}
            />
        }
        <img
          className="PlayBackMenuItem__icons-item"
          src={EditBox}
          alt=""
          title="Редактировать полигон"
        />
        <img
          className="PlayBackMenuItem__icons-item"
          // onClick={onDelete}
          src={TrashBox}
          alt=""
          title="Удалить полигон"
        />
      </div>
    </div>
  )
}

export default PlayBackMenuItem
