import './FieldPreview.scss'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useListing } from '~shared/hooks/use-listing/use-listing'

import { getAllFieldsSelector } from '../../../../../../srcOld/redux/selectors/fieldsSelectors'
import { deleteField, setChangeFieldModal, setVisibleAddFieldModal } from '../../../../../../srcOld/redux/slices/fieldSlice'
import { useAppDispatch } from '../../../../../../srcOld/redux/store'
import { FieldModal } from '../../field-modal'

export const FieldPreview = () => {
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

  const {
    tableBlock,
    refreshData
  } = useListing({
    columnNames: ['Название поля', 'Цвет поля'],
    mapTableData: (fieldsList: any) => {
      return fieldsList.map((item: any) => {
        return {
          id: item.id,
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
    <div className='FieldPreview'>
      <button
        className='addButton'
        onClick={() => dispatch(setVisibleAddFieldModal(true))}
      >
        + Добавить культуру
      </button>
      <div>
        {tableBlock()}
      </div>
      <FieldModal />
    </div>
  )
}
