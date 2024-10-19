import './EquipsTypesList.scss'

import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getOptionalEquipmentTypesListSelector } from '~processes/redux/selectors/optionalEquipmentSelectors'
import type { EquipType } from '~processes/redux/slices/mapSlice'
import { deleteType, setAddModalVisible, setEditedType } from '~processes/redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '~processes/redux/store'
import { useListing } from '~shared/hooks/use-listing/use-listing'

import { EquipsTypesListModal } from '../../equips-types-list-modal'
import { t } from 'i18next';

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
    columnNames: [t('Название'), t('Статус')],
    mapTableData: (typesList: any) => {
      return typesList.map((item: any) => ({
        id: item.id,
        key: item.id,
        [t('Название')]: item.description, // Используем динамический ключ с квадратными скобками
        [t('Статус')]: item.status ? t('Активен') : t('Неактивен') // Используем динамический ключ
      }));
    },
    fetchListHandler: () => typesList,
    editItemHandler,
    deleteItemHandler
  });


  useEffect(() => {
    refreshData()
  }, [typesList])

  return (
    <div className='EquipsTypesList'>
      <button
        className='EquipsTypesList__addButton'
        onClick={addModalHandler}
      >
        + {t("Добавить тип")}
      </button>
      {tableBlock()}
      <EquipsTypesListModal />
    </div>
  )
})
