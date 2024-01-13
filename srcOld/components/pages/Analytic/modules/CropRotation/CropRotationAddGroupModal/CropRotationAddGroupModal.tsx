import './CropRotationAddGroupModal.scss'
import React, { useEffect, useState } from 'react'
import { Button, Input, message, Modal } from 'antd'
import * as cn from 'classnames'
import { useAppDispatch } from '../../../../../../redux/store'
import { postCropRotationGroupThunk, setEditedCropRotationGroup, setOpenCropRotationAddGroupModal } from '../../../../../../redux/slices/cropRotationSlice'
import { useSelector } from 'react-redux'
import { getAllPolygonsSelector } from '../../../../../../redux/selectors/mapSelectors'
import CropRotationPolygonPreview from '../CropRotationTable/CropRotationPolygonPreview/CropRotationPolygonPreview'
import TextArea from 'antd/es/input/TextArea'
import Search from 'antd/es/input/Search'
import { getEditedCropRotationGroupSelector, getOpenCropRotationAddGroupModalSelector } from '../../../../../../redux/selectors/cropRotationSelectors'

const CropRotationAddGroupModal = () => {
  const editedCropRotationGroup = useSelector(getEditedCropRotationGroupSelector)
  const openCropRotationAddGroupModal = useSelector(getOpenCropRotationAddGroupModalSelector)
  const allPolygons = useSelector(getAllPolygonsSelector)

  const dispatch = useAppDispatch()
  const [groupName, setGroupName] = useState('')
  const [description, setDescription] = useState('')
  const [groupData, setGroupData] = useState<number[]>([])
  const [search, setSearch] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [allPolygonsWithFilter, setAllPolygonsWithFilter] = useState(allPolygons)

  // useEffect(() => { todo редактирование группы
  //   if (editedCropRotationGroup !== undefined) {
  //     setGroupName(editedCropRotationGroup.groupName)
  //     setDescription(editedCropRotationGroup.description)
  //     setGroupData(editedCropRotationGroup.groupData)
  //   }
  // }, [openCropRotationAddGroupModal])

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

  const [messageApi, contextHolder] = message.useMessage()
  const handleSubmit = () => {
    if (groupName && groupData.length > 0) {
      closeHandler()
      dispatch(postCropRotationGroupThunk({
        groupName,
        description: description ? description : '-----',
        groupData
      }))
    } else {
      messageApi.info('Название или группа не могут быть пустыми')
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
    dispatch(setEditedCropRotationGroup(undefined))
    setGroupName('')
    setDescription('')
    setGroupData([])
    setSearch('')
    setSearchValue('')
  }

  const addAll = () => {
    const allPolygonIds = allPolygons.map(polygon => +polygon.id)
    setGroupData(allPolygonIds)
  }

  const resetSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setSearch('')
    }
    setSearchValue(e.target.value)
  }

  return (
    <Modal
      className={cn(
        'fieldPreviewModal',
        'CropRotationAddGroupModal'
      )}
      title={
        editedCropRotationGroup
          ? 'Редактировать группу севооборота'
          : 'Добавить группу севооборота'
      }
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
              {
                editedCropRotationGroup
                  ? 'Редактирование полей для группы севооборота'
                  : 'Выбор полей для группы севооборота'
              }
              <Button onClick={addAll}>
                Выбрать все
              </Button>
            </div>
            <Search
              placeholder='Воспользуйтесь поиском'
              value={searchValue}
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
        {contextHolder}
      </div>
    </Modal>
  )
}

export default CropRotationAddGroupModal
