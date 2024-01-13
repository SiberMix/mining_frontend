import './CropRotation.scss'
import React, { useEffect } from 'react'
import CropRotationAddGroupModal from './CropRotationAddGroupModal/CropRotationAddGroupModal'
import { getCropRotationGroupsThunk } from '../../../../../redux/slices/cropRotationSlice'
import { useAppDispatch } from '../../../../../redux/store'
import CropRotationList from './CropRotationList/CropRotationList'
import CropRotationTable from './CropRotationTable/CropRotationTable'

const CropRotation = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCropRotationGroupsThunk())
  }, [])

  return (
    <div className='cropRotation'>
      <div className='cropRotation-menu'>
        <CropRotationList />
      </div>
      <CropRotationTable />
      <CropRotationAddGroupModal />
    </div>
  )
}

export default CropRotation
