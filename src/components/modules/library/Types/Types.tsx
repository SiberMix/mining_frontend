import s from './Types.module.scss'
import * as cn from 'classnames'
import React, { useEffect } from 'react'
import { useListing } from '../../../../hooks/use-listing'
import type { EquipType } from '../../../../types/equip'
import AddTypeModal from './TypesAddModal'
import {
  getOptionalEquipmentTypesListSelector
} from '../../../../redux/selectors/optionalEquipmentSelectors'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../../redux/store'
import {
  deleteType,
  setAddModalVisible,
  setEditedType
} from '../../../../redux/slices/optionalEquipmentSlice'

const EquipmentTypesComponent = () => {
  const dispatch = useAppDispatch()
  const typesList = useSelector(getOptionalEquipmentTypesListSelector)

  const editItemHandler = async (id: number) => {
    dispatch(setEditedType(id))
    dispatch(setAddModalVisible(true))
  }

  const deleteItemHandler = async (id: number) => {
    dispatch(deleteType(id))
  }

  const addModalHandler = () => {
    dispatch(setAddModalVisible(true))
  }

  const { tableBlock, refreshData } = useListing<EquipType>({
    columnNames: ['Название', 'Статус'],
    mapTableData: (typesList) => {
      return typesList.map((item) => ({
        id: item.id,
        key: item.id,
        Название: item.description,
        Статус: item.status ? 'Активен' : 'Неактивен'
      }))
    },
    fetchListHandler: () => typesList,
    editItemHandler,
    deleteItemHandler
  })

  useEffect(() => {
    refreshData()
  }, [typesList])

  return (
    <div className={cn(s.root)}>
      <button
        className={cn(s.addButton)}
        onClick={addModalHandler}
      >
        + Добавить тип
      </button>
      {tableBlock()}
      <AddTypeModal />
    </div>
  )
}

export default React.memo(EquipmentTypesComponent)
