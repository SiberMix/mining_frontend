import './EquipTrailerList.scss'

import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getOptionalEquipmentTrailerListSelector } from '~processes/redux/selectors/optionalEquipmentSelectors'
import type { EquipTrailer } from '~processes/redux/slices/mapSlice'
import { deleteTrailer, setAddModalVisible, setEditedTrailer } from '~processes/redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '~processes/redux/store'
import { useListing } from '~shared/hooks/use-listing/use-listing'

import { EquipTrailerListModal } from '../../equip-trailer-list-modal'

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
    columnNames: ['Название прицепа', 'Госномер'],
    mapTableData: (trailerList: any) => {
      return trailerList.map((item: any) => {
        return {
          id: item.id,
          key: item.id,
          'Название прицепа': item.trailer_name,
          Госномер: item.gosnomer
        }
      })
    },
    fetchListHandler: () => trailerList,
    deleteItemHandler,
    editItemHandler
  })

  useEffect(() => {
    refreshData()
  }, [trailerList])

  return (
    <div className='EquipTrailerList'>
      <button
        className='EquipTrailerList__addButton'
        onClick={addModalHandler}
      >
        + Добавить прицеп
      </button>
      {tableBlock()}
      <EquipTrailerListModal />
    </div>
  )
})
