import './PlayBackMenuItem.scss'
import React from 'react'
import EditBox from '/src/assets/icons/edit.svg'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getAllEquipmentSelector } from '../../../../../../redux/selectors/mapSelectors'
import { addShowingPlayback, CurrentPlaybackData, deletePlayback, removeShowingPlayback, setEditedPlayback } from '../../../../../../redux/slices/playBackSlice'
import { useAppDispatch } from '../../../../../../redux/store'
import DeleteOption from '../../../../../common/DeleteOption/DeleteOption'
import { getShowingPlaybackSelector } from '../../../../../../redux/selectors/playbackSelectors'

type Props = {
  itemPlaybackData: CurrentPlaybackData
}

const PlayBackMenuItem: React.FC<Props> = ({
  itemPlaybackData
}) => {
  const dispatch = useAppDispatch()
  const showingPlaybacks = useSelector(getShowingPlaybackSelector)
  const watchingEquips = useSelector(getAllEquipmentSelector)
    .filter(equip => (itemPlaybackData.equipment.some(e => equip.id === e)))
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

  const deleteHandler = () => {
    dispatch(deletePlayback(itemPlaybackData.id))
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
        <DeleteOption
          onDelete={deleteHandler}
          className={'PlayBackMenuItem__icons-item'}
          popConfirmTitle={'Вы точно хотите удалить плэйбэк?'}
          title={'Удалить плэйбэк'}
          popConfirmDescription={'Удалить плэйбэк'}
        />
      </div>
    </div>
  )
}

export default React.memo(PlayBackMenuItem)
