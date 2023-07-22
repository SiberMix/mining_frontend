import './CropRotationControl.scss'
import { Button } from 'antd'

const CropRotationControl = () => {
  return (
    <div className='cropRotation-control'>
      <Button
        type='primary'
        className='cropRotation-control-btn'
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
