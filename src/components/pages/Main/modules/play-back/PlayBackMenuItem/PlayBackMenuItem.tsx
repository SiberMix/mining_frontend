import './PlayBackMenuItem.scss'
import React, { useState } from 'react'
import TrashBox from '/src/assets/icons/delete.svg'
import EditBox from '/src/assets/icons/edit.svg'
import {
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getAllEquipmentSelector } from '../../../../../../redux/selectors/mapSelectors'

type Props = {
  index: number,
  color: string,
  equipment: string[],
  name: string
}

const PlayBackMenuItem: React.FC<Props> = ({
  index,
  equipment,
  name,
  color
}) => {

  const watchingEquips = useSelector(getAllEquipmentSelector)
    .filter(equip => (equipment.some(e => equip.id.toString() === e)))
    .map(filteredEquip => filteredEquip.equip_name)

  const [isWatching, setIsWatching] = useState(false)

  const toggleIsWatching = () => {
    setIsWatching(isWatching => !isWatching)
  }

  const createCurrentStringFromWatchingEquips = () => {
    const currentString = watchingEquips.join(', ')
    if (currentString.length > 35) {
      return currentString.slice(0, 32) + '...'
    }
    return currentString
  }

  return (
    <div className="PlayBackMenuItem">
      <div className="PlayBackMenuItem__info">
        <span className="PlayBackMenuItem__info-name">
          {name}
        </span>
        <span className="PlayBackMenuItem__info-equips">
          {createCurrentStringFromWatchingEquips()}
        </span>
      </div>
      <div className="PlayBackMenuItem__icons">
        <div
          className="PlayBackMenuItem__icons-color"
          style={{ backgroundColor: color }}
        />
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
          //todo добавить тайт
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
