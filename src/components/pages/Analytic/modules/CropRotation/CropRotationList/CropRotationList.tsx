import './CropRotationList.scss'
import CropRotationListItem from './CropRotationListItem/CropRotationListItem'

const fakeArr = [
  {
    name: 'Тестовый образец',
    description: 'oeruvniuenvuierniuvneriuvniuernviurenviunruievniurenivune'
  },
  {
    name: 'Вторая группа',
    description: 'oeruvniuenvuierniuvneriuvniuernviurenviunruievniurenoeruvniuenvuierniuvneriuniuren'
  },
  {
    name: 'Номер три',
    description: 'oeruvniuenvuierniuvneriuvniuernviurenviunruiev'
  },
  {
    name: '4етвертый',
    description: 'oeruvniuenvuierniuvneriuvniuernviurenviunruievniurenoeruvniuenvuierniuvneriuvniuernviurenviunruievniuren'
  }
]

const CropRotationList = () => {
  return (
    <div className='cropRotation-list'>
      {
        fakeArr.map((f, index) => (
          <CropRotationListItem
            key={'CropRotationListItem_' + f}
            itemInfo={f}
          />
        ))
      }
    </div>
  )
}

export default CropRotationList
