import './PlayBackMenuItem.scss'
import React from 'react'
import TrashBox from '/src/assets/icons/delete.svg'
import EditBox from '/src/assets/icons/edit.svg'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getAllEquipmentSelector } from '../../../../../../redux/selectors/mapSelectors'
import { addShowingPlayback, CurrentPlaybackData, deletePlayback, removeShowingPlayback, setEditedPlayback } from '../../../../../../redux/slices/playBackSlice'
import { RootState, useAppDispatch } from '../../../../../../redux/store'

type Props = {
  itemPlaybackData: CurrentPlaybackData
}

const PlayBackMenuItem: React.FC<Props> = ({
  itemPlaybackData
}) => {
  const dispatch = useAppDispatch()
  const showingPlaybacks = useSelector((state: RootState) => state.playBackReducer.showingPlaybacks)
  const watchingEquips = useSelector(getAllEquipmentSelector)
    .filter(equip => (itemPlaybackData.equipment.some(e => equip.id.toString() === e)))
    .map(filteredEquip => filteredEquip.equip_name)

  const toggleIsWatching = () => {
    // if (showingPlaybacks.some(s => s === itemPlaybackData.id)) {
    if (showingPlaybacks === itemPlaybackData.id) {
      dispatch(removeShowingPlayback(itemPlaybackData.id))
    } else {
      dispatch(addShowingPlayback(itemPlaybackData.id))
    }
  }

  const createCurrentStringFromWatchingEquips = () => {
    const currentString = watchingEquips.join(', ')
    if (currentString.length > 35) {
      return currentString.slice(0, 32) + '...'
    }
    return currentString
  }

  return (
    <div className='PlayBackMenuItem'>
      <div className='PlayBackMenuItem__info'>
        <span className='PlayBackMenuItem__info-name'>
          {itemPlaybackData.name}
        </span>
        <span className='PlayBackMenuItem__info-equips'>
          {createCurrentStringFromWatchingEquips()}
        </span>
      </div>
      <div className='PlayBackMenuItem__icons'>
        <div
          className='PlayBackMenuItem__icons-color'
          style={{ backgroundColor: itemPlaybackData.color }}
        />
        {
          // showingPlaybacks.some(s => s === itemPlaybackData.id)
          showingPlaybacks === itemPlaybackData.id
            ? <EyeOutlined
              className='PlayBackMenuItem__icons-item'
              style={{ color: '#ffffff' }}
              onClick={toggleIsWatching}
            />
            : <EyeInvisibleOutlined
              className='PlayBackMenuItem__icons-item'
              style={{ color: '#848484' }}
              onClick={toggleIsWatching}
            />
        }
        <img
          className='PlayBackMenuItem__icons-item'
          src={EditBox}
          onClick={() => dispatch(setEditedPlayback(itemPlaybackData))}
          alt=''
          title='Редактировать плэйбэк'
        />
        <img
          className='PlayBackMenuItem__icons-item'
          onClick={() => dispatch(deletePlayback(itemPlaybackData.id))}
          src={TrashBox}
          alt=''
          title='Удалить плэйбэк'
        />
      </div>
    </div>
  )
}

export default PlayBackMenuItem
