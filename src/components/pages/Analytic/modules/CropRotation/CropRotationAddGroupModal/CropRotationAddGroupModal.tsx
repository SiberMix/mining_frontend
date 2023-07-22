import './CropRotationAddGroupModal.scss'
import React, { useEffect, useState } from 'react'
import { Button, Input, Modal } from 'antd'
import * as cn from 'classnames'
import { RootState, useAppDispatch } from '../../../../../../redux/store'
import { setCropRotationGroup, setOpenCropRotationAddGroupModal } from '../../../../../../redux/slices/cropRotationSlice'
import { useSelector } from 'react-redux'
import { getAllPolygonsSelector } from '../../../../../../redux/selectors/mapSelectors'
import CropRotationPolygonPreview from '../CropRotationTable/CropRotationPolygonPreview/CropRotationPolygonPreview'
import TextArea from 'antd/es/input/TextArea'
import Search from 'antd/es/input/Search'

const CropRotationAddGroupModal = () => {
  const openCropRotationAddGroupModal = useSelector((state: RootState) => state.cropRotationReducer.openCropRotationAddGroupModal)
  const allPolygons = useSelector(getAllPolygonsSelector)

  const dispatch = useAppDispatch()
  const [groupName, setGroupName] = useState('')
  const [description, setDescription] = useState('')
  const [groupData, setGroupData] = useState<number[]>([])
  const [search, setSearch] = useState('')
  const [allPolygonsWithFilter, setAllPolygonsWithFilter] = useState(allPolygons)

  useEffect(() => {
    if (search.length > 0) {
      const filteredPolygons = allPolygons.filter(polygon =>
        polygon.name.toLowerCase()
          .includes(search.toLowerCase())
      )
      setAllPolygonsWithFilter(filteredPolygons)
    } else {
      setAllPolygonsWithFilter(allPolygons)
    }
  }, [search])

  const handleSubmit = () => {
    if (groupName && groupData.length > 0) {
      dispatch(setCropRotationGroup({
        id: Math.floor(Math.random() * (10000 - 1) + 1),
        groupName,
        description,
        groupData
      }))
      console.log({
        groupName,
        description,
        groupData
      })
      closeHandler()
    } else {
      alert('Название или группа не могут быть пустыми')
    }
  }

  const togglePolygonInGroupData = (id: number) => {
    if (groupData.some(data => data === id)) {
      setGroupData(groupData => groupData.filter(data => data !== id))
    } else {
      setGroupData(groupData => [...groupData, id])
    }
  }

  const closeHandler = () => {
    dispatch(setOpenCropRotationAddGroupModal(false))
    setGroupName('')
    setDescription('')
    setGroupData([])
    setSearch('')
  }

  const addAll = () => {
    const allPolygonIds = allPolygons.map(polygon => +polygon.id)
    setGroupData(allPolygonIds)
  }

  const resetSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setSearch('')
    }
  }

  return (
    <Modal
      className={cn(
        'fieldPreviewModal',
        'CropRotationAddGroupModal'
      )}
      title='Добавить группу севооборота'
      open={openCropRotationAddGroupModal}
      onCancel={closeHandler}
      onOk={handleSubmit}
      width={'50vw'}
    >
      <div className='CropRotationAddGroupModal-wrapper'>
        <div style={{ width: '40%' }}>
          <Input
            placeholder='Название группы'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <div className='CropRotationAddGroupModal-description'>
            <TextArea
              rows={4}
              value={description}
              maxLength={450}
              placeholder={'Ваше описание группы'}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className='CropRotationAddGroupModal-select-wrapper'>
          <div className='CropRotationAddGroupModal-title-wrapper'>
            <div className='CropRotationAddGroupModal-title'>
              <Button onClick={() => setGroupData([])}>
                Убрать все
              </Button>
              Выберете поля для группы севооборота
              <Button onClick={addAll}>
                Выбрать все
              </Button>
            </div>
            <Search
              placeholder='Воспользуйтесь поиском'
              onSearch={setSearch}
              onChange={resetSearch} />
          </div>
          <div className='CropRotationAddGroupModal-select'>
            {
              allPolygonsWithFilter.map(polygon => {
                return (
                  <div
                    key={polygon.id}
                    className='CropRotationAddGroupModal-item'
                    style={{ border: groupData.some(g => g === polygon.id) ? '1px solid #ffffff' : '' }}>
                    <CropRotationPolygonPreview
                      polygon={polygon}
                      onClick={() => togglePolygonInGroupData(+polygon.id)}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CropRotationAddGroupModal
