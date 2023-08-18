import './CropRotationTable.scss'
import React, { useEffect, useState } from 'react'
import { Select, Table } from 'antd'
import { Polygon } from '../../../../../../types'
import CropRotationPolygonPreview from './CropRotationPolygonPreview/CropRotationPolygonPreview'
import { useSelector } from 'react-redux'
import { getAllPolygonsSelector } from '../../../../../../redux/selectors/mapSelectors'
import { cropPolygon, CropRotationGroup, CropRotationGroupYear, editCropRotationGroupCultureThunk } from '../../../../../../redux/slices/cropRotationSlice'
import { getAllFieldsSelector } from '../../../../../../redux/selectors/fieldsSelectors'
import { getArrOfLoadingCulturesSelector, getCropRotationGroupsSelector, getIsLoadingCropRotation, getSelectedCropRotationGroupSelector } from '../../../../../../redux/selectors/cropRotationSelectors'
import styled from 'styled-components'
import { createBGColorForCustomSelect, getContrastColor } from '../helpfullFunctionsCropRotation'
import { useAppDispatch } from '../../../../../../redux/store'
import BasePreloader from '../../../../../common/BasePreloader/BasePreloader'

const CropRotationTable = () => {
  const dispatch = useAppDispatch()
  const allPolygons = useSelector(getAllPolygonsSelector)
  const cropRotationGroups: CropRotationGroup[] = useSelector(getCropRotationGroupsSelector)
  const selectedCropRotationGroup = useSelector(getSelectedCropRotationGroupSelector)
  const allFields = useSelector(getAllFieldsSelector)
  const arrOfLoadingCultures = useSelector(getArrOfLoadingCulturesSelector)
  const isLoadingCropRotation = useSelector(getIsLoadingCropRotation)
  const [tableData, setTableData] = useState(allPolygons)
  const [yearsUsingGroup, setYearsUsingGroup] = useState<CropRotationGroupYear[] | undefined>(undefined)

  useEffect(() => {
    if (selectedCropRotationGroup === null) {
      setTableData(allPolygons)
    } else {
      const usingGroup: CropRotationGroup | undefined = cropRotationGroups.find(group => group.id_group === selectedCropRotationGroup)

      if (usingGroup !== undefined) {
        setYearsUsingGroup([...usingGroup.years].sort((a, b) => Number(b.year) - Number(a.year)))
      }

      const usingPolygonsIds = usingGroup?.years.reduce((acc: number[], year: CropRotationGroupYear) => {
        year.cropPolygons.forEach((polygon: cropPolygon) => {
          if (!acc.includes(polygon.id)) {
            acc.push(polygon.id)
          }
        })
        return acc
      }, [])

      const usingPolygons = allPolygons.filter(p => usingPolygonsIds?.some(u => u === p.id))

      setTableData(usingPolygons)
    }
  }, [cropRotationGroups, selectedCropRotationGroup])

  return (
    <div className='cropRotation-table-wrapper'>
      {
        isLoadingCropRotation
          ? <BasePreloader position={'relative'} width={'100%'} height={'100%'} />
          : (
            <Table
              className='cropRotation-table'
              dataSource={tableData}
              pagination={false}
              bordered={true}
              scroll={{ y: '92vh' }}
            >
              <Table.Column
                title='Список полей'
                dataIndex='name'
                key='name'
                render={(_, record: Polygon) => {
                  return (
                    <CropRotationPolygonPreview
                      polygon={record}
                      key={record.name}
                    />
                  )
                }}
              />
              {
                yearsUsingGroup?.map((year) => (
                    <Table.Column
                      key={`sequence-${year}`}
                      title={year.year}
                      dataIndex='sequence'
                      render={(_, record: Polygon) => {
                        const culture = year.cropPolygons.find(p => p.id === record.id)?.culture
                        const groupId = cropRotationGroups.find(group => group.id_group === selectedCropRotationGroup)?.id_group
                        const isLoading = arrOfLoadingCultures.some(loadingCulture => loadingCulture.groupId === groupId
                          && loadingCulture.polygonId === +record.id
                          && loadingCulture.year === +year.year)

                        return (
                          <CustomSelect //styled-components down
                            backgroundColor={createBGColorForCustomSelect(culture, allFields)}
                            disabled={isLoading}
                            loading={isLoading}
                            // defaultValue={culture ?? 'Не задано'}
                            value={culture ?? 'Не задано'}
                            dropdownStyle={customDropdownStyle}
                            onChange={(value) => dispatch(editCropRotationGroupCultureThunk({
                              cultureId: value as number,
                              year: +year.year,
                              polygonId: +record.id,
                              groupId: groupId as number
                            }))}
                            options={allFields.map(field => ({
                              value: field.id,
                              label: field.name
                            }))}
                          />
                        )
                      }}
                    />
                  )
                )
              }
            </Table>
          )
      }

    </div>
  )
}

const customDropdownStyle = {
  backgroundColor: '#565656'
}

const CustomSelect = styled(Select)<{ backgroundColor?: string }>`
  width: 100%;

  .ant-select-selector {
    background-color: ${props => props.backgroundColor} !important;
    color: ${props => getContrastColor(props.backgroundColor || 'red')} !important;
    border-color: #929292 !important;
  }

  .ant-select-arrow {
    color: ${props => getContrastColor(props.backgroundColor || 'red')} !important;
  }
`

export default CropRotationTable
