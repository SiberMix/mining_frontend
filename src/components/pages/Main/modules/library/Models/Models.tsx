import s from './Models.module.scss'
import * as cn from 'classnames'
import React, { useEffect } from 'react'
import { useListing } from '../../../../../../hooks/use-listing'
import type { EquipModal } from '../../../../../../types/equip'
import AddModelModal from './ModelAddModal'
import { useSelector } from 'react-redux'
import {
  getOptionalEquipmentModelsListSelector
} from '../../../../../../redux/selectors/optionalEquipmentSelectors'
import { useAppDispatch } from '../../../../../../redux/store'
import {
  deleteModel,
  getEquipsModelsList,
  setAddModalVisible,
  setEditedModel
} from '../../../../../../redux/slices/optionalEquipmentSlice'

const EquipmentModelsComponent = () => {
  const dispatch = useAppDispatch()
  const modelsList = useSelector(getOptionalEquipmentModelsListSelector)

  const editItemHandler = async (id: number) => {
    dispatch(setEditedModel(id))
    dispatch(setAddModalVisible(true))
  }

  const deleteItemHandler = async (id: number) => {
    dispatch(deleteModel(id))
    dispatch(getEquipsModelsList())
  }

  const addModalHandler = () => {
    dispatch(setAddModalVisible(true))
  }

  const { tableBlock, refreshData } = useListing<EquipModal>({
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
