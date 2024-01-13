import './CropRotationList.scss'
import CropRotationListItem from './CropRotationListItem/CropRotationListItem'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../../../../redux/store'
import { setOpenCropRotationAddGroupModal, setSelectedCropRotationGroup } from '../../../../../../redux/slices/cropRotationSlice'
import { getCropRotationGroupsSelector, getSelectedCropRotationGroupSelector } from '../../../../../../redux/selectors/cropRotationSelectors'
import { useEffect } from 'react'
import { getAllPolygonsSelector } from '../../../../../../redux/selectors/mapSelectors'

const CropRotationList = () => {
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
    <div className='cropRotation-list'>
      <div className='cropRotation-list-total'>
        Севооборот ({cropRotationGroups.length} плана)
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

    </div>
  )
}

export default CropRotationList
