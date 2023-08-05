import './PolygonDrawerPreview.scss'
import React from 'react'
import { Polygon as PolygonType } from '../../../../../../../types'
import { Drawer } from 'antd'
import MiniMap from '../../../../../../common/MiniMap/MiniMap'
import { useSelector } from 'react-redux'
import { getAllPolygonsSelector } from '../../../../../../../redux/selectors/mapSelectors'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

type Props = {
  isOpen: boolean
  polygon: PolygonType,
  onClose: () => void
}

const PolygonDrawerPreview: React.FC<Props> = ({
  polygon,
  onClose,
  isOpen
}) => {
  const allPolygons = useSelector(getAllPolygonsSelector)

  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: '19px',
            color: '#ffffff'
          }
        }
      }
    },
    colors: [polygon.sequence.color],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
      }
    }
  }

  const polygonsWithSameSequence = allPolygons.filter(p => p.sequence.name === polygon.sequence.name)
  const squareOfAllSamePolygons = polygonsWithSameSequence.reduce((acc: number, cur: PolygonType) => {
    return acc + (+cur.square)
  }, 0)
  const percentOfSequence = (+polygon.square * 100 / squareOfAllSamePolygons).toFixed(2)

  return (
    <Drawer
      className='polygonDrawerPreview'
      title='Статичная информация по полигону'
      placement='right'
      onClose={onClose}
      open={isOpen}
      width={'25%'}
    >
      <div className='polygonDrawerPreview-minimap'>
        <MiniMap polygon={polygon} />
      </div>
      <p>
        <span className='polygonDrawerPreview-info_name'>Название: </span>
        <span className='polygonDrawerPreview-info'>{polygon.name}</span>
      </p>
      <p>
        <span className='polygonDrawerPreview-info_name'>Статус активности: </span>
        <span className='polygonDrawerPreview-info'>{polygon.activeStatus ? 'Активно' : 'Не активно'}</span>
      </p>
      <p>
        <span className='polygonDrawerPreview-info_name'>Культура: </span>
        <span className='polygonDrawerPreview-info'>{polygon.sequence.name}</span>
      </p>
      <p>
        <span className='polygonDrawerPreview-info_name'>Общая площадь: </span>
        <span className='polygonDrawerPreview-info'>{polygon.square} га</span>
      </p>
      <div className='polygonDrawerPreview-info_chart'>
        <span className='polygonDrawerPreview-info_name'>Процент от всей культуры: </span>
        <Chart
          options={options}
          type='radialBar'
          series={[+percentOfSequence]}
          width='100%'
          height={315}
        />
      </div>
    </Drawer>
  )
}

export default PolygonDrawerPreview
