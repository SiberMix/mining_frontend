import './EquipTrailerList.scss'

import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getOptionalEquipmentTrailerListSelector } from '~processes/redux/selectors/optionalEquipmentSelectors'
import type { EquipTrailer } from '~processes/redux/slices/mapSlice'
import { deleteTrailer, setAddModalVisible, setEditedTrailer } from '~processes/redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '~processes/redux/store'
import { useListing } from '~shared/hooks/use-listing/use-listing'

import { EquipTrailerListModal } from '../../equip-trailer-list-modal'
import { t } from 'i18next';

export const EquipTrailerList = memo(() => {
  const dispatch = useAppDispatch()
  const trailerList = useSelector(getOptionalEquipmentTrailerListSelector)

  const editItemHandler = async (id: number) => {
    dispatch(setEditedTrailer(id))
    dispatch(setAddModalVisible(true))
  }

  const deleteItemHandler = async (id: number) => {
    dispatch(deleteTrailer(id))
  }

  const addModalHandler = () => {
    dispatch(setAddModalVisible(true))
  }

  const {
    tableBlock,
    refreshData
  } = useListing<EquipTrailer>({
    columnNames: [t('Название прицепа'), t('Госномер')], // Перевод названий столбцов
    mapTableData: (trailerList: any) => {
      return trailerList.map((item: any) => {
        return {
          id: item.id,
          key: item.id,
          [t('Название прицепа')]: item.trailer_name, // Динамический ключ для перевода
          [t('Госномер')]: item.gosnomer // Динамический ключ для перевода
        }
      })
    },
    fetchListHandler: () => trailerList,
    deleteItemHandler,
    editItemHandler
  });


  useEffect(() => {
    refreshData()
  }, [trailerList])

  return (
    <div className='EquipTrailerList'>
      <button
        className='EquipTrailerList__addButton'
        onClick={addModalHandler}
      >
        + {t("Добавить прицеп")}
      </button>
      {tableBlock()}
      <EquipTrailerListModal />
    </div>
  )
})
