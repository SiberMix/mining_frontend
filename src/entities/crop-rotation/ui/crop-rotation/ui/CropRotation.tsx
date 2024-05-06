import './CropRotation.scss'

import React, { useEffect } from 'react'

import { getCropRotationGroupsThunk } from '~processes/redux/slices/cropRotationSlice'
import { useAppDispatch } from '~processes/redux/store'

import { CropRotationAddGroupModal } from '../../crop-rotation-add-group-modal'
import { CropRotationTable } from '../../crop-rotation-table'
import { CropRotationList } from '../../сrop-rotation-list'

export const CropRotation = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCropRotationGroupsThunk())
  }, [])

  return (
    <div className='cropRotation'>
      {/*<div className='cropRotation-menu'>*/}
      <CropRotationList />
      {/*</div>*/}
      <CropRotationTable />
      <CropRotationAddGroupModal />
    </div>
  )
}
