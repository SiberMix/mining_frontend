import './CropRotationTable.scss'
import React from 'react'
import { Table } from 'antd'
import { Polygon } from '../../../../../../types'
import CropRotationPolygonPreview from './CropRotationPolygonPreview/CropRotationPolygonPreview'

const {
  Column,
  ColumnGroup
} = Table

type Props = {
  tableData: Polygon[]
}

const CropRotationTable: React.FC<Props> = ({ tableData }) => {

  const years = [
    '2019',
    '2020',
    '2021',
    '2022'
  ]

  return (
    <div className='cropRotation-table-wrapper'>
      <Table
        className='cropRotation-table'
        dataSource={tableData}
        pagination={false}
        bordered={true}
        scroll={{ y: '80vh' }}
      >
        <Table.Column
          title='Список полей'
          dataIndex='name'
          key='name'
          render={(text, record: Polygon) => (
            <CropRotationPolygonPreview
              polygon={record}
              key={record.name}
            />
          )}
        />
        {years.map((year) => (
          <Table.Column
            key={`sequence-${year}`}
            title={year}
            dataIndex='sequence'
            render={(text, record: Polygon) => (
              <div style={{ color: record.sequence.color }}>
                {record.sequence.name}
              </div>
            )}
          />
        ))}
      </Table>
    </div>
  )
}

export default CropRotationTable
