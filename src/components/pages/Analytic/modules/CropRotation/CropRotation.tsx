import './CropRotation.scss'
import CropRotationList from './CropRotationList/CropRotationList'
import CropRotationControl from './CropRotationControl/CropRotationControl'
import CropRotationTable from './CropRotationTable/CropRotationTable'

const CropRotation = () => {
  return (
    <div className='cropRotation'>
      <div className='cropRotation-menu'>
        <CropRotationList />
        <CropRotationControl />
      </div>
      <CropRotationTable />
    </div>
  )
}

export default CropRotation
