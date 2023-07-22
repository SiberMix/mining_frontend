import './CropRotation.scss'
import CropRotationList from './CropRotationList/CropRotationList'
import CropRotationControl from './CropRotationControl/CropRotationControl'
import CropRotationTable from './CropRotationTable/CropRotationTable'
import { useSelector } from 'react-redux'
import { getAllPolygonsSelector } from '../../../../../redux/selectors/mapSelectors'
import CropRotationAddGroupModal from './CropRotationAddGroupModal/CropRotationAddGroupModal'

const CropRotation = () => {
  const allPolygons = useSelector(getAllPolygonsSelector)

  return (
    <div className='cropRotation'>
      <div className='cropRotation-menu'>
        <CropRotationList />
        <CropRotationControl />
      </div>
      <CropRotationTable tableData={allPolygons} />
      <CropRotationAddGroupModal />
    </div>
  )
}

export default CropRotation
