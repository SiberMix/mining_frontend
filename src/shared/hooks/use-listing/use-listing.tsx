import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import DeleteOption from '../../../../srcOld/components/common/DeleteOption/DeleteOption'
import EditBox from '../../assets/icons/edit.svg'

export const useListing = <Type extends { id: number }>({
  headerData = null,
  tableActions = [],
  tableSelectActions = [],
  columnNames = [],
  disableActions = false,
  multilineKebabItems = false,
  showLimitSelector = false,
  hasDragAndDrop = false,
  prefetchMethod = null,
  fetchListHandler,
  deleteItemHandler,
  editItemHandler,
  mapTableData = () => [],
  customLimitSelectData = null
}: any) => {
  // Данные
  const [listData, setListData] = useState<Type[]>([])

  // Индексы данных для перетаскивания
  const [rowOrderData, setRowOrderData] = useState<number[]>([])

  // Статус загрузки таблицы
  const [loading, setLoading] = useState(false)

  // Статус выполненных запросов
  const [isMainDataFetched, setIsMainDataFetched] = useState(false)

  // ID удаляемого элемента (если не null -
  // то показывает модалку подтверждения удаления)
  const [removingItemId, setRemovingItemId] = useState<number | null>(null)

  useEffect(() => {
    fetchInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refreshData = async () => {
    await fetchList()
  }

  /**
   * Получение списка элементов
   */
  const fetchList = async () => {
    if (!fetchListHandler) return
    setLoading(true)
    const response = await fetchListHandler()

    setLoading(false)

    if (response) {
      setIsMainDataFetched(true)

      setListData(response)

    }

    // snack.open(getErrorMessage(response, selectedLanguage), snackStatus.ERROR)
  }

  /**
   * Удаляет тип справочника
   */
  const removeItem = async (id?: number) => {
    if (!id || !deleteItemHandler) return

    const response = await deleteItemHandler(id)

    if (response.status === 'success') return response

    // snack.open(getErrorMessage(response, selectedLanguage), snackStatus.ERROR)
    return response
  }

  /**
   * Данные для таблицы
   */
  const tableData = useMemo(() => {
    return mapTableData(listData)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listData])

  /**
   * Обработчик успешного удаления элемента
   */
  const successRemoveHandler = async () => {
    setRemovingItemId(null)
    await fetchList()
  }

  /**
   * Получает данные при монтировании компоненты
   */
  const fetchInitialData = async (page?: number) => {
    fetchList()
  }

  /**
   * Шапка страницы
   */
  const contentHeaderBlock = () => (
    <>
      {/*{!!headerData && (*/}
      {/*  <ContentHeader*/}
      {/*    breadcrumbs={headerData.breadcrumbs}*/}
      {/*    pageTitle={headerData.pageTitle}*/}
      {/*    buttons={headerData.buttons}*/}
      {/*    id={headerData.id}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  )

  const emptyDataBlock = () => (
    <EmptyText>
      Нет данных
    </EmptyText>
  )

  /**
   * Блок таблицы с действиями
   */
  const tableBlock = (tableClass?: string) => {
    const columns: ColumnsType<Type> = columnNames?.map((item: any) => ({
      title: item,
      dataIndex: item
    }))

    columns?.push({
      title: 'Действия',
      dataIndex: '',
      key: 'x',
      render: (value, record, index) => (
        <div>
          <Edit
            onClick={() => editItemHandler?.(record.id)}
            src={EditBox}
            alt=''
            title='Редактировать'
          />
          <DeleteOption
            onDelete={() => removeItem(record.id)}
            title='Удалить'
            popConfirmTitle='Вы уверены, что хотите удалить?'
            popConfirmDescription='Удалить'
            style={{
              padding: '3px',
              width: '20px',
              height: '20px',
              cursor: 'pointer',
              alignItems: 'flex-end'
            }}
          />
        </div>
      )
    })

    return (isMainDataFetched || !fetchListHandler) && !tableData.length
      ? (
        emptyDataBlock()
      )
      : (
        <TableComponent
          size='small'
          scroll={{ x: '100%' }}
          loading={loading}
          id='page-list-table'
          //@ts-ignore
          columns={columns}
          dataSource={tableData}
          pagination={false}
        />
      )
  }

  return {
    // data
    loading,
    tableActions,
    listData,
    setListData,
    tableData,
    rowOrderData: hasDragAndDrop ? rowOrderData : [],
    showLimitSelector,
    fetchList,
    refreshData,

    // components
    contentHeaderBlock,
    tableBlock,
    emptyDataBlock
  }
}

const TableComponent = styled(Table)`
    border: none;
    border-radius: 0;
    margin-top: 20px;

    * {
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
    }

    thead {
        background: #232323 !important;
    }

    .ant-table-tbody > tr.ant-table-row:hover > td {
        background: #565656 !important;
    }

    .ant-table-thead {
        background: #232323;
        border-top-left-radius: 0;
        border-top-right-radius: 0;

        & > tr > th {
            border-bottom: 1px solid #323136;
        }
    }

    .ant-table-thead > tr > th {
        color: #fff;
        background: #232323;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-right: 1px solid #323136;

        &:last-child {
            border-right: none;
        }

        &::before {
            display: none;
        }
    }

    // do in dark theme

    .ant-table-tbody > tr > td {
        background: #232323;
        color: #fff;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        user-select: none;
    }

    .ant-table-tbody {
        border-spacing: 0 5px;

        & > tr {
            & > td {
                border-bottom: 1px solid #323136;
            }

        }
    }

    .ant-table-wrapper {
        overflow-x: hidden !important;
    }

`

const Edit = styled.img`
    padding: 3px;

    width: 20px;
    height: 20px;
    cursor: pointer;
`

const EmptyText = styled.div`
    color: #fff;
    font-size: 16px;
    text-align: center;
    padding: 20px;
`
