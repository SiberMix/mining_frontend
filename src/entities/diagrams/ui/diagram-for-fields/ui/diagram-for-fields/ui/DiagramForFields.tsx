import './DiagramForFields.scss'

import { Badge, Col, Row } from 'antd'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { getAllFieldsSelector } from '../../../../../../../srcOld/redux/selectors/fieldsSelectors'
import { getAllPolygonsSelector } from '../../../../../../../srcOld/redux/selectors/mapSelectors'
import { DonutChartWidget } from '../../donut-chart-widget'

export const DiagramForFields = memo(() => {
  const polygons = useSelector(getAllPolygonsSelector)
  const fields = useSelector(getAllFieldsSelector)

  const cultures = fields.map(field => field.name)
  const colors = fields.map(field => field.color)

  const squares = cultures.map((culture, index) => {
    const squareOfCulture: number[] = []
    polygons.forEach(polygon => {
      if (polygon.sequence.name === culture) {
        squareOfCulture.push(parseFloat(polygon.square))
      }
    })
    return +squareOfCulture
      .reduce((num: number, sum: number) => num + sum, 0)
      .toFixed(2)
  })

  const jointSessionData = () => {
    let arr: any = []
    for (let i = 0; i < squares.length; i++) {
      const data = squares[i]
      const label = cultures[i]
      const color = colors[i]
      arr = [...arr, {
        data: data,
        label: label,
        color: color
      }]
    }
    return arr
  }

  const conbinedSessionData = jointSessionData()

  return (
    <DonutChartWidget
      series={squares}
      labels={cultures}
      title='Всего'
      customOptions={{ colors: colors }}
      extra={
        <Row justify='center'>
          <Col
            xs={20}
            sm={20}
            md={20}
            lg={24}
          >
            <div
              className='diagram-markers-wrapper'
            >
              {conbinedSessionData.map((elm: any) => (
                <div
                  className='diagram-marker'
                  key={elm.label}
                >
                  <div>
                    <Badge color={elm.color} />
                    <span className='diagram-marker-name'>
                      {elm.label}
                    </span>
                  </div>
                  <span className='diagram-marker-value'>
                    {elm.data}
                  </span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      }
    />
  )
})
