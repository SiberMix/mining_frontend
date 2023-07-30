import './EquipsAnalyticDiagrams.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import { getPikedEquipsColorsSelector, getScheduleTypeSelector } from '../../../../../../redux/selectors/equipsAnalyticSlectors'
import { getAllEquipment } from '../../../../../../redux/slices/mapSlice'
import DefaultDiagram from '../../../diagrams/DefaultDiagram/DefaultDiagram'

const EquipsAnalyticDiagrams = () => {
  const allEquips = useSelector(getAllEquipment)
  const pikedEquipsColors = useSelector(getPikedEquipsColorsSelector)
  //todo убрать эту хуйню
  const scheduleType = useSelector(getScheduleTypeSelector)

  return (
    <div className='fieldsAnalyticDiagrams'>
      <DefaultDiagram key={'fieldsAnalyticDiagrams' + scheduleType} />
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
