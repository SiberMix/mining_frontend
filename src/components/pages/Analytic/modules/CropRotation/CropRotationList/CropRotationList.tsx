import './CropRotationList.scss'
import CropRotationListItem from './CropRotationListItem/CropRotationListItem'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../../../../redux/store'
import { setOpenCropRotationAddGroupModal } from '../../../../../../redux/slices/cropRotationSlice'
import { Button } from 'antd'

const CropRotationList = () => {
  const dispatch = useAppDispatch()
  const selectedCropRotationGroup = useSelector((state: RootState) => state.cropRotationReducer.selectedCropRotationGroup)
  const cropRotationGroups = useSelector((state: RootState) => state.cropRotationReducer.cropRotationGroups)

  return (
    <div className='cropRotation-list'>
      {
        cropRotationGroups.length > 0
          ? cropRotationGroups.map((group) => (
            <CropRotationListItem
              key={'CropRotationListItem_' + group.groupName}
              itemInfo={group}
              active={group.id === selectedCropRotationGroup}
            />
          ))
          : <div className='cropRotation-list-empty'>
            На данный момент нет групп
            <Button
              type='primary'
              className='cropRotation-control-btn'
              onClick={() => dispatch(setOpenCropRotationAddGroupModal(true))}
            >
              Создайте первую группу
            </Button>
          </div>
      }
    </div>
  )
}

export default CropRotationList
