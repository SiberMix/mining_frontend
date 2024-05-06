import './CropRotationList.scss'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  getCropRotationGroupsSelector,
  getSelectedCropRotationGroupSelector
} from '~processes/redux/selectors/cropRotationSelectors'
import { getAllPolygonsSelector } from '~processes/redux/selectors/mapSelectors'
import {
  setOpenCropRotationAddGroupModal,
  setSelectedCropRotationGroup
} from '~processes/redux/slices/cropRotationSlice'
import { useAppDispatch } from '~processes/redux/store'
import { SideOutLayout } from '~shared/ui/side-out-layout'

import { CropRotationListItem } from '../../сrop-rotation-list-item'

export const CropRotationList = () => {
  const dispatch = useAppDispatch()
  const selectedCropRotationGroup = useSelector(getSelectedCropRotationGroupSelector)
  const cropRotationGroups = useSelector(getCropRotationGroupsSelector)
  const countOfAllPolygons = useSelector(getAllPolygonsSelector).length

  useEffect(() => {
    if (selectedCropRotationGroup === null && cropRotationGroups.length > 0) {
      dispatch(setSelectedCropRotationGroup(cropRotationGroups[0].id_group))
    }
  }, [cropRotationGroups])

  return (
    <SideOutLayout
      position='relative'
      className='cropRotation-list'
    >
      <div className='cropRotation-list-total'>
        Севооборот (
        {cropRotationGroups.length}
        {' '}
        плана)
      </div>
      <div className='cropRotation-list-items'>
        <button
          className='cropRotation-list-addBtn'
          onClick={() => dispatch(setOpenCropRotationAddGroupModal(true))}
        >
          + Добавить
        </button>
        {
          cropRotationGroups.map((group, index) => (
            <CropRotationListItem
              key={'CropRotationListItem_' + group.id_group}
              itemInfo={group}
              active={group.id_group === selectedCropRotationGroup}
              countOfAllPolygons={countOfAllPolygons}
              main={index === 0}
            />
          ))
        }
      </div>

    </SideOutLayout>
  )
}
