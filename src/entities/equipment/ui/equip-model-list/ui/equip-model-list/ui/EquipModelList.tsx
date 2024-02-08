import './EquipModelList.scss'

import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useListing } from '~shared/hooks/use-listing/use-listing'

import { getOptionalEquipmentModelsListSelector } from '../../../../../../../srcOld/redux/selectors/optionalEquipmentSelectors'
import type { EquipModal } from '../../../../../../../srcOld/redux/slices/mapSlice'
import { deleteModel, setAddModalVisible, setEditedModel } from '../../../../../../../srcOld/redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '../../../../../../../srcOld/redux/store'
import { EquipModelListModal } from '../../equip-model-list-modal'

export const EquipModelList = memo(() => {
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
    <div className='EquipModelList'>
      <button
        className='EquipModelList__addButton'
        onClick={addModalHandler}
      >
        + Добавить модель
      </button>
      {tableBlock()}
      <EquipModelListModal />
    </div>
  )
})
