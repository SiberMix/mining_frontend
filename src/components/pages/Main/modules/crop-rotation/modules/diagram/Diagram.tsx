import './Diagram.scss'
import React from 'react'
import {
  Badge,
  Card,
  Col,
  Row
} from 'antd'
import ApexChart from 'react-apexcharts'
import { apexPieChartDefaultOption } from './default-data'
import { useSelector } from 'react-redux'
import { getAllPolygonsSelector } from '../../../../../../../redux/selectors/mapSelectors'
import { getAllFieldsSelector } from '../../../../../../../redux/selectors/fieldsSelectors'

const DonutChartWidget = (props: any) => {
  const {
    series,
    customOptions,
    labels,
    width,
    height,
    title,
    extra
  } = props
  let options = apexPieChartDefaultOption
  options.labels = labels
  options.plotOptions.pie.donut.labels.total.label = title
  if (!title) {
    options.plotOptions.pie.donut.labels.show = false
  }
  if (customOptions) {
    options = { ...options, ...customOptions }
  }
  return (
    <Card className="diagram">
      <div className="text-center">
        <ApexChart
          type="donut"
          options={options}
          series={series}
          width={width}
          height={height}
        />
        {extra}
      </div>
    </Card>
  )
}

const Diagram = () => {
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
    return squareOfCulture.reduce((num: number, sum: number) => num + sum, 0)
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
      title="Всего"
      customOptions={{ colors: colors }}
      extra={
        <Row justify="center">
          <Col
            xs={20}
            sm={20}
            md={20}
            lg={24}
          >
            <div
              className="diagram-markers-wrapper"
            >
              {conbinedSessionData.map((elm: any) => (
                <div
                  className="diagram-marker"
                  key={elm.label}
                >
                  <div>
                    <Badge color={elm.color} />
                    <span className="diagram-marker-name">
                      {elm.label}
                    </span>
                  </div>
                  <span className="diagram-marker-value">
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
}

export default Diagram
