import './CropRotationTable.scss'
import React, { useEffect, useState } from 'react'
import { Select, Table } from 'antd'
import { Polygon } from '../../../../../../types'
import CropRotationPolygonPreview from './CropRotationPolygonPreview/CropRotationPolygonPreview'
import { useSelector } from 'react-redux'
import { getAllPolygonsSelector } from '../../../../../../redux/selectors/mapSelectors'
import { CropRotationGroup } from '../../../../../../redux/slices/cropRotationSlice'
import { RootState } from '../../../../../../redux/store'
import { getAllFieldsSelector } from '../../../../../../redux/selectors/fieldsSelectors'
import CropRotationTableFieldSelect from './CropRotationTableFieldSelect/CropRotationTableFieldSelect'

const { Option } = Select

const years = [
  '2019',
  '2020',
  '2021',
  '2022'
].reverse()

const CropRotationTable = () => {

  const allPolygons = useSelector(getAllPolygonsSelector)
  const cropRotationGroups: CropRotationGroup[] = useSelector((state: RootState) => state.cropRotationReducer.cropRotationGroups)
  const selectedCropRotationGroup = useSelector((state: RootState) => state.cropRotationReducer.selectedCropRotationGroup)
  const [tableData, setTableData] = useState(allPolygons)
  const dataForCropRotationTableFieldSelect = useSelector(getAllFieldsSelector)
    .map(field => {
      return {
        value: field.name,
        label: field.name
      }
    })

  useEffect(() => {
    if (selectedCropRotationGroup === null) {
      setTableData(allPolygons)
    } else {
      const idOfUsingPolygons = cropRotationGroups.find(group => group.id === selectedCropRotationGroup)?.groupData
      const usingPolygons = allPolygons.filter(polygon => idOfUsingPolygons?.some(usingId => usingId === polygon.id))
      setTableData(usingPolygons)
    }
  }, [selectedCropRotationGroup])

  return (
    <div className='cropRotation-table-wrapper'>
      {
        selectedCropRotationGroup
          ? <Table
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
                  <CropRotationTableFieldSelect
                    key={year + record.name}
                    options={dataForCropRotationTableFieldSelect}
                    initialValue={record.sequence.name}
                    color={record.sequence.color}
                    handleOnChange={(value) => console.log(value)}
                  />
                )}
              />
            ))}
          </Table>
          : <h2>
            Не выбрана группа севооборота
          </h2>
      }

    </div>
  )
}

export default CropRotationTable
