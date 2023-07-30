import './EquipsAnalyticDiagrams.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import { getPikedEquipsColorsSelector } from '../../../../../../redux/selectors/equipsAnalyticSlectors'
import { getAllEquipment } from '../../../../../../redux/slices/mapSlice'

const EquipsAnalyticDiagrams = () => {
  const allEquips = useSelector(getAllEquipment)
  const pikedEquipsColors = useSelector(getPikedEquipsColorsSelector)

  return (
    <div className='fieldsAnalyticDiagrams'>
      {/*<EquipsAnalyticDiagram */}
      {/*  title={'График количества топлива техники'} */}
      {/*  series={}*/}
      {/*  categories={} */}
      {/*  colors={pikedEquipsColors}*/}
      {/*/>*/}
      {/*<EquipsAnalyticDiagram */}
      {/*  title={} */}
      {/*  series={} */}
      {/*  categories={} */}
      {/*  colors={pikedEquipsColors}*/}
      {/*/>*/}
    </div>
  )
}

export default EquipsAnalyticDiagrams
