import './PlayBackMenuItem.scss'

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import EditBox from '~shared/assets/icons/edit.svg'

import DeleteOption from '../../../../../../srcOld/components/common/DeleteOption/DeleteOption'
import { getAllEquipmentSelector } from '../../../../../../srcOld/redux/selectors/mapSelectors'
import { getShowingPlaybackSelector } from '../../../../../../srcOld/redux/selectors/playbackSelectors'
import type { CurrentPlaybackData } from '../../../../../../srcOld/redux/slices/playBackSlice'
import { addShowingPlayback, deletePlayback, removeShowingPlayback, setEditedPlayback } from '../../../../../../srcOld/redux/slices/playBackSlice'
import { useAppDispatch } from '../../../../../../srcOld/redux/store'

type PlayBackMenuItemProps = {
  itemPlaybackData: CurrentPlaybackData
}

export const PlayBackMenuItem = memo(({ itemPlaybackData }: PlayBackMenuItemProps) => {
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
          className='PlayBackMenuItem__icons-item'
          popConfirmTitle='Вы точно хотите удалить плэйбэк?'
          title='Удалить плэйбэк'
          popConfirmDescription='Удалить плэйбэк'
        />
      </div>
    </div>
  )
})
