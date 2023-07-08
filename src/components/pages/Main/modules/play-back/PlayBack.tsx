import './PlayBack.scss'
import React from 'react'
import PlayBackMenuItem from './PlayBackMenuItem/PlayBackMenuItem'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../../redux/store'
import PlayBackAddModal from './PlayBackAddModal/PlayBackAddModal'
import { useAppDispatch } from '../../../../../redux/store'
import { setIsOpenPlayBackAddModal } from '../../../../../redux/slices/playBackSlice'

const PlayBack = () => {
  const dispatch = useAppDispatch()
  const playBacksData = useSelector((state: RootState) => state.playBackReducer.playBacksData)

  const addButtonHandler = () => {
    dispatch(setIsOpenPlayBackAddModal(true))
  }

  return (
    <div className="PlayBack">
      <div className="PlayBack__header">
        Воспроизведение местоположения
      </div>
      <button
        className="PlayBack__btn-add"
        onClick={addButtonHandler}
      >
        + Добавить воспроизведение
      </button>
      <div className="PlayBack__content">
        {
          playBacksData.map((item, index) => (
            <PlayBackMenuItem
              key={index}
              index={index}
              title={item.title}
              watchingEquips={item.watching_equips}
            />
          ))
        }
      </div>
      <PlayBackAddModal />
    </div>
  )
}

export default PlayBack
