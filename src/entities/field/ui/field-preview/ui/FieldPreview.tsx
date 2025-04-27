import './FieldPreview.scss'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getAllFieldsSelector } from '~processes/redux/selectors/fieldsSelectors'
import { deleteField, setChangeFieldModal, setVisibleAddFieldModal } from '~processes/redux/slices/fieldSlice'
import { useAppDispatch } from '~processes/redux/store'
import { useListing } from '~shared/hooks/use-listing/use-listing'

import { FieldModal } from '../../field-modal'

export const FieldPreview = () => {
  const dispatch = useAppDispatch()
  const fieldsList = useSelector(getAllFieldsSelector)

  const editItemHandler = (id: number) => {
    dispatch(setChangeFieldModal(id))
  }

  const deleteItemHandler = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить эту материал?')) {
      dispatch(deleteField(id))
    }
  }

  const {
    tableBlock,
    refreshData
  } = useListing({
    columnNames: ['Название материала', 'Цвет материала'],
    mapTableData: (fieldsList: any) => {
      return fieldsList.map((item: any) => {
        return {
          id: item.id,
          key: item.id,
          'Название материала': item.name,
          'Цвет материала': (
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
        + Добавить материал
      </button>
      <div>
        {tableBlock()}
      </div>
      <FieldModal />
    </div>
  )
}
