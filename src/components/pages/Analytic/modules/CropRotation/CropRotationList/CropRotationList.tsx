import './CropRotationList.scss'
import CropRotationListItem from './CropRotationListItem/CropRotationListItem'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../../../../redux/store'
import { setOpenCropRotationAddGroupModal } from '../../../../../../redux/slices/cropRotationSlice'

const CropRotationList = () => {
  const dispatch = useAppDispatch()
  const selectedCropRotationGroup = useSelector((state: RootState) => state.cropRotationReducer.selectedCropRotationGroup)
  const cropRotationGroups = useSelector((state: RootState) => state.cropRotationReducer.cropRotationGroups)

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
          cropRotationGroups.map((group) => (
            <CropRotationListItem
              key={'CropRotationListItem_' + group.groupName}
              itemInfo={group}
              active={group.id === selectedCropRotationGroup}
            />
          ))
        }
      </div>

    </div>
  )
}

export default CropRotationList
