import './EquipsTypesList.scss'

import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useListing } from '~shared/hooks/use-listing/use-listing'

import { getOptionalEquipmentTypesListSelector } from '../../../../../../../../srcOld/redux/selectors/optionalEquipmentSelectors'
import type { EquipType } from '../../../../../../../../srcOld/redux/slices/mapSlice'
import { deleteType, setAddModalVisible, setEditedType } from '../../../../../../../../srcOld/redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '../../../../../../../../srcOld/redux/store'
import { EquipsTypesListModal } from '../../equips-types-list-modal'

export const EquipsTypesList = memo(() => {
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

  const {
    tableBlock,
    refreshData
  } = useListing<EquipType>({
    columnNames: ['Название', 'Статус'],
    mapTableData: (typesList: any) => { //todo suka any
      return typesList.map((item: any) => ({
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
    <div className='EquipsTypesList'>
      <button
        className='EquipsTypesList__addButton'
        onClick={addModalHandler}
      >
        + Добавить тип
      </button>
      {tableBlock()}
      <EquipsTypesListModal />
    </div>
  )
})
