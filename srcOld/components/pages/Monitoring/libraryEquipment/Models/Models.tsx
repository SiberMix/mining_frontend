import * as cn from 'classnames'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useListing } from '~shared/hooks/use-listing/use-listing'

import { getOptionalEquipmentModelsListSelector } from '../../../../../redux/selectors/optionalEquipmentSelectors'
import type { EquipModal } from '../../../../../redux/slices/mapSlice'
import { deleteModel, setAddModalVisible, setEditedModel } from '../../../../../redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '../../../../../redux/store'
import AddModelModal from './ModelAddModal'
import s from './Models.module.scss'

const EquipmentModelsComponent = () => {
  const dispatch = useAppDispatch()
  const modelsList = useSelector(getOptionalEquipmentModelsListSelector)

  const editItemHandler = async (id: number) => {
    dispatch(setEditedModel(id))
    dispatch(setAddModalVisible(true))
  }

  const deleteItemHandler = async (id: number) => {
    dispatch(deleteModel(id))
  }

  const addModalHandler = () => {
    dispatch(setAddModalVisible(true))
  }

  const {
    tableBlock,
    refreshData
  } = useListing<EquipModal>({
    columnNames: ['Название', 'Длина', 'Ширина'],
    mapTableData: (data: any) => {
      return data.map((item: any) => {
        return {
          id: item.id,
          key: item.id,
          Название: item.description,
          Длина: item.length,
          Ширина: item.width
        }
      })
    },
    fetchListHandler: () => modelsList,
    deleteItemHandler,
    editItemHandler
  })

  useEffect(() => {
    refreshData()
  }, [modelsList])

  return (
    <div className={cn(s.root)}>
      <button
        className={cn(s.addButton)}
        onClick={addModalHandler}
      >
        + Добавить модель
      </button>
      {tableBlock()}
      <AddModelModal />
    </div>
  )
}

export default React.memo(EquipmentModelsComponent)
