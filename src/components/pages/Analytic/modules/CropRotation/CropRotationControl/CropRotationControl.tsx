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
        Сохранить
      </Button>
      <Button
        type='primary'
        className='cropRotation-control-btn'
      >
        Применить к карте
      </Button>
      <Button
        type='primary'
        className='cropRotation-control-btn'
      >
        Редактировать
      </Button>
    </div>
  )
}

export default CropRotationControl
