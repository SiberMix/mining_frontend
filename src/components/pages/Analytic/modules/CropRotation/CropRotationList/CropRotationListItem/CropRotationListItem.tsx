import './CropRotationListItem.scss'
import React from 'react'
import '../CropRotationList.scss'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import { CropRotationGroup, deleteCropRotationGroupThunk, setEditedCropRotationGroup, setSelectedCropRotationGroup } from '../../../../../../../redux/slices/cropRotationSlice'
import { useAppDispatch } from '../../../../../../../redux/store'
import EditBox from '/src/assets/icons/edit.svg'
import { CheckCircleFilled } from '@ant-design/icons'
import DeleteOption from '../../../../../../common/DeleteOption/DeleteOption'

type Props = {
  itemInfo: CropRotationGroup
  active: boolean
}

const CropRotationListItem: React.FC<Props> = ({
  itemInfo,
  active
}) => {
  const dispatch = useAppDispatch()

  const maxTextLength = 20
  const truncatedComment = itemInfo.description.length > maxTextLength ? itemInfo.description.slice(0, maxTextLength) + '...' : itemInfo.description

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

  return (
    <div className='cropRotation-list-item-wrapper'>
      <div className='cropRotation-list-item' onClick={selectGroupHandler}>
        <div className='cropRotation-list-item__info'>
        <span
          className='cropRotation-list-item__info-name'
        >
          {itemInfo.name}
          <CheckCircleFilled
            className='cropRotation-list-item__info-icon'
            style={{ color: active ? '#91C658' : '#434345' }}
          />
        </span>
          <span className='cropRotation-list-item__info-description'>
            {truncatedComment}
        </span>
        </div>
        <div className='cropRotation-list-item__icons'>
          <img
            className='cropRotation-list-item__icons-item'
            src={EditBox}
            onClick={editeClickHandler}
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
    </div>
  )
}

export default CropRotationListItem

const Icon = styled(SVG)<{ active: boolean }>`
  padding: 5px;
  height: 70px;
  width: 70px;
  cursor: pointer;

  path {
    fill: ${({ active }) => (!active ? '#c5ef75' : '#ffffff')};
  }
`
