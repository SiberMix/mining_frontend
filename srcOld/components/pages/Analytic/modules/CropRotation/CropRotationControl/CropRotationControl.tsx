import './CropRotationControl.scss'
import { Button } from 'antd'
import { useAppDispatch } from '../../../../../../redux/store'
import { setOpenCropRotationAddGroupModal } from '../../../../../../redux/slices/cropRotationSlice'

const CropRotationControl = () => {
  const dispatch = useAppDispatch()

  return (
    <div className='cropRotation-control'>
      <Button
        type='primary'
        className='cropRotation-control-btn'
        onClick={() => dispatch(setOpenCropRotationAddGroupModal(true))}
      >
        Добавить группу
      </Button>
      <Button
        type='primary'
        className='cropRotation-control-btn'
      >
        Сохранить изменения
      </Button>
      <Button
        type='primary'
        className='cropRotation-control-btn'
      >
        Применить группу к карте
      </Button>
      <Button
        type='primary'
        className='cropRotation-control-btn'
      >
        Редактировать группу
      </Button>
    </div>
  )
}

export default CropRotationControl
