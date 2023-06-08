import s from './FieldPreview.module.scss'
import * as cn from 'classnames'
import React, {
  useEffect,
  useState
} from 'react'
import { useListing } from '../../../../hooks/use-listing'
import AddPreviewModal from './PreviewAddModal'
import { useAppDispatch } from '../../../../redux/store'
import { useSelector } from 'react-redux'
import { getAllFieldsSelector } from '../../../../redux/selectors/fieldsSelectors'
import {
  deleteField,
  setChangeFieldModal,
  setVisibleAddFieldModal
} from '../../../../redux/slices/fieldSlice'

const EquipmentPreviewsComponent = () => {
  const dispatch = useAppDispatch()
  const fieldsList = useSelector(getAllFieldsSelector)

  const editItemHandler = (id: number) => {
    dispatch(setChangeFieldModal(id))
  }

  const deleteItemHandler = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить эту культуру?')) {
      dispatch(deleteField(id))
    }
  }

  const { tableBlock, refreshData } = useListing({
    columnNames: ['Название поля', 'Цвет поля'],
    mapTableData: (fieldsList: any) => {
      return fieldsList.map((item: any) => {
        return {
          key: item.id,
          'Название поля': item.name,
          'Цвет поля': (
            <div
              style={{
                backgroundColor: item.color,
                width: '20px',
                height: '20px'
              }}
            />
          )
        }
      })
    },
    fetchListHandler: () => fieldsList,
    editItemHandler,
    deleteItemHandler
  })

  useEffect(() => {
    refreshData()
  }, [fieldsList])

  return (
    <div className={cn(s.root)}>
      <button
        className={cn(s.addButton)}
        onClick={() => dispatch(setVisibleAddFieldModal(true))}
      >
        + Добавить культуру
      </button>
      <div>
        {tableBlock()}
      </div>
      <AddPreviewModal />
    </div>
  )
}

export default EquipmentPreviewsComponent
