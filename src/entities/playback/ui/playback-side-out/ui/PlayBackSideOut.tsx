import './PlayBackSideOut.scss'

import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { SideOutLayout } from '~shared/ui/side-out-layout'

import { setIsOpenPlayBackAddModal } from '../../../../../srcOld/redux/slices/playBackSlice'
import type { RootState } from '../../../../../srcOld/redux/store'
import { useAppDispatch } from '../../../../../srcOld/redux/store'
import { PlayBackAddModal } from '../../play-back-add-modal'
import { PlayBackEditModal } from '../../play-back-edit-modal'
import { PlayBackMenuItem } from '../../play-back-menu-item'

export const PlayBackSideOut = memo(() => {
  const dispatch = useAppDispatch()
  const playbacksData = useSelector((state: RootState) => state.playBackReducer.playbacksData)

  const addButtonHandler = () => {
    dispatch(setIsOpenPlayBackAddModal(true))
  }

  return (
    <SideOutLayout className='PlayBackSideOut'>
      <div className='PlayBackSideOut__header'>
        Воспроизведение местоположения
      </div>
      <button
        className='PlayBackSideOut__btn-add'
        onClick={addButtonHandler}
      >
        + Добавить воспроизведение
      </button>
      <div className='PlayBackSideOut__content'>
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
    </SideOutLayout>
  )
})
