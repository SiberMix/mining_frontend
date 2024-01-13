import './CropRotationListItem.scss'
import React from 'react'
import '../CropRotationList.scss'
import {
  CropRotationGroup,
  deleteCropRotationGroupThunk,
  setEditedCropRotationGroup,
  setMainCropRotationGroupThunk,
  setSelectedCropRotationGroup
} from '../../../../../../../redux/slices/cropRotationSlice'
import { useAppDispatch } from '../../../../../../../redux/store'
import EditBox from '/src/assets/icons/edit.svg'
import { CheckCircleFilled, VerticalAlignBottomOutlined } from '@ant-design/icons'
import DeleteOption from '../../../../../../common/DeleteOption/DeleteOption'
import * as cn from 'classnames'
import { useSelector } from 'react-redux'
import { getIsLoadingCreationNewMainGroupSelector } from '../../../../../../../redux/selectors/cropRotationSelectors'
import { message } from 'antd'

type Props = {
  itemInfo: CropRotationGroup
  active: boolean
  countOfAllPolygons: number
  main: boolean
}

const CropRotationListItem: React.FC<Props> = ({
  itemInfo,
  active,
  countOfAllPolygons,
  main
}) => {
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
      <div className={cn('cropRotation-list-item', { active })}
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
                    style={{ color: '#858585' }}
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

export default CropRotationListItem
