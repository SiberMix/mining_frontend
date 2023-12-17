import './PlayBack.scss'
import React from 'react'
import PlayBackMenuItem from './PlayBackMenuItem/PlayBackMenuItem'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../../redux/store'
import { useAppDispatch } from '../../../../../redux/store'
import PlayBackAddModal from './PlayBackModal/PlayBackAddModal'
import { setIsOpenPlayBackAddModal } from '../../../../../redux/slices/playBackSlice'
import PlayBackEditModal from './PlayBackModal/PlayBackEditModal'

const PlayBack = () => {
  const dispatch = useAppDispatch()
  const playbacksData = useSelector((state: RootState) => state.playBackReducer.playbacksData)

  const addButtonHandler = () => {
    dispatch(setIsOpenPlayBackAddModal(true))
  }

  return (
    <div className='PlayBack'>
      <div className='PlayBack__header'>
        Воспроизведение местоположения
      </div>
      <button
        className='PlayBack__btn-add'
        onClick={addButtonHandler}
      >
        + Добавить воспроизведение
      </button>
      <div className='PlayBack__content'>
        {
          playbacksData.map((item) => (
            <PlayBackMenuItem
              key={`PlayBackMenuItem__${item.id}`}
              itemPlaybackData={item}
            />
          ))
        }
      </div>
      <PlayBackAddModal />
      <PlayBackEditModal />
    </div>
  )
}

export default PlayBack
