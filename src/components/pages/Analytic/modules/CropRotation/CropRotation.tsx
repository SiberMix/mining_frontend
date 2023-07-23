import './CropRotation.scss'
import CropRotationList from './CropRotationList/CropRotationList'
import CropRotationTable from './CropRotationTable/CropRotationTable'
import CropRotationAddGroupModal from './CropRotationAddGroupModal/CropRotationAddGroupModal'

const CropRotation = () => {

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
