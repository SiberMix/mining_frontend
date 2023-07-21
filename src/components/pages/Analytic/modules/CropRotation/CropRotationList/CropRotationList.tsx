import './CropRotationList.scss'
import CropRotationListItem from './CropRotationListItem/CropRotationListItem'

const fakeArr = ['первый', 'второй', 'третий', 'четвертый']

const CropRotationList = () => {
  return (
    <div className='cropRotation-list'>
      {
        fakeArr.map((f, index) => (
          <CropRotationListItem
            key={'CropRotationListItem_' + f}
            listItemName={f}
          />
        ))
      }
    </div>
  )
}

export default CropRotationList
