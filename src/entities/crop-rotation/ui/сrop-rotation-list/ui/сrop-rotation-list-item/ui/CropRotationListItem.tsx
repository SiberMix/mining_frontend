import './CropRotationListItem.scss'
import '~entities/crop-rotation/ui/сrop-rotation-list/ui/сrop-rotation-list/ui/CropRotationList.scss'

import { CheckCircleFilled, VerticalAlignBottomOutlined } from '@ant-design/icons'
import { message } from 'antd'
import cn from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'

import { getIsLoadingCreationNewMainGroupSelector } from '~processes/redux/selectors/cropRotationSelectors'
import type { CropRotationGroup } from '~processes/redux/slices/cropRotationSlice'
import {
  deleteCropRotationGroupThunk,
  setEditedCropRotationGroup,
  setMainCropRotationGroupThunk,
  setSelectedCropRotationGroup
} from '~processes/redux/slices/cropRotationSlice'
import { useAppDispatch } from '~processes/redux/store'
import EditBox from '~shared/assets/icons/edit.svg'
import { DeleteOption } from '~shared/ui/delete-option'

type CropRotationListItemProps = {
  itemInfo: CropRotationGroup,
  active: boolean,
  countOfAllPolygons: number,
  main: boolean
}

export const CropRotationListItem = ({
  itemInfo,
  active,
  countOfAllPolygons,
  main
}: CropRotationListItemProps) => {
  const dispatch = useAppDispatch()
  const isLoadingCreationNewMainGroup = useSelector(getIsLoadingCreationNewMainGroupSelector)

  const selectGroupHandler = () => {
    dispatch(setSelectedCropRotationGroup(itemInfo.id_group))
  }

  const deleteHandler = () => {
    dispatch(deleteCropRotationGroupThunk(itemInfo.id_group))
  }

  const editeClickHandler = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation()
    dispatch(setEditedCropRotationGroup(itemInfo.id_group))
  }

  const chooseMainCropGroup = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    dispatch(setMainCropRotationGroupThunk(itemInfo.id_group))
  }

  //todo убрать эту заглушку

  const [messageApi, contextHolder] = message.useMessage()

  function alertMsg(e: React.MouseEvent<HTMLImageElement>) {
    e.stopPropagation()
    messageApi.info('Данный функционал находится в разработке и недоступен в демонстрационном режиме')
  }

  return (
    <div className='cropRotation-list-item-wrapper'>
      <div
        className={cn('cropRotation-list-item', { active })}
        onClick={selectGroupHandler}
      >
        <div className='cropRotation-list-item__info'>
          <span className='cropRotation-list-item__info-name'>
            {itemInfo.name}
          </span>
          <span className='cropRotation-list-item__info-description'>
            {itemInfo.description}
          </span>
        </div>
        <div className='cropRotation-list-item__icons'>
          {
            itemInfo.years[0].cropPolygons.length === countOfAllPolygons
              ?
              main ? <CheckCircleFilled //если группа главная, то отмечаем это
                className={cn('cropRotation-list-item__info-icon', 'cropRotation-list-item__icons-item')}
                style={{ color: '#91C658' }}
              />
                : (
                  !isLoadingCreationNewMainGroup && //Убираем иконку когда идет загрузка
                  <VerticalAlignBottomOutlined
                    className='cropRotation-list-item__icons-item'
                    style={{ color: 'var(--gray-100)' }}
                    onClick={chooseMainCropGroup}
                  />
                )
              : null //ничего не показываем, если у группы не все поля
          }
          <img
            className='cropRotation-list-item__icons-item'
            src={EditBox}
            onClick={alertMsg} //editeClickHandler
            alt=''
            title='Редактировать плэйбэк'
          />
          <DeleteOption
            onDelete={deleteHandler}
            className='cropRotation-list-item__icons-item'
            title='Удалить группу'
            popConfirmTitle='Вы уверены, что хотите удалить группу?'
            popConfirmDescription='Удалить группу'
          />
        </div>
      </div>
      {contextHolder}
    </div>
  )
}
