import './EquipModelList.scss'

import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getOptionalEquipmentModelsListSelector } from '~processes/redux/selectors/optionalEquipmentSelectors'
import type { EquipModal } from '~processes/redux/slices/mapSlice'
import { deleteModel, setAddModalVisible, setEditedModel } from '~processes/redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '~processes/redux/store'
import { useListing } from '~shared/hooks/use-listing/use-listing'

import { EquipModelListModal } from '../../equip-model-list-modal'
import { t } from 'i18next';

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
    columnNames: [t('Название'), t('Длина'), t('Ширина')], // Перевод названий столбцов
    mapTableData: (data: any) => {
      return data.map((item: any) => {
        return {
          id: item.id,
          key: item.id,
          [t('Название')]: item.description, // Динамический ключ для перевода
          [t('Длина')]: item.length, // Динамический ключ для перевода
          [t('Ширина')]: item.width // Динамический ключ для перевода
        }
      })
    },
    fetchListHandler: () => modelsList,
    deleteItemHandler,
    editItemHandler
  });


  useEffect(() => {
    refreshData()
  }, [modelsList])

  return (
    <div className='EquipModelList'>
      <button
        className='EquipModelList__addButton'
        onClick={addModalHandler}
      >
        + {t("Добавить модель")}
      </button>
      {tableBlock()}
      <EquipModelListModal />
    </div>
  )
})
