import './Diagram.scss'
import React from 'react'
import {
  Badge,
  Card,
  Col,
  Row
} from 'antd'
import ApexChart from 'react-apexcharts'
import {
  apexPieChartDefaultOption,
  conbinedSessionData,
  sessionColor,
  sessionData,
  sessionLabels
} from './default-data'

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
  return (
    <DonutChartWidget
      series={sessionData}
      labels={sessionLabels}
      title="Всего"
      customOptions={{ colors: sessionColor }}
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
