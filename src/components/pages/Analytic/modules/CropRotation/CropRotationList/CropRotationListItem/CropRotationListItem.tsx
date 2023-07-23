import './CropRotationListItem.scss'
import React from 'react'
import '../CropRotationList.scss'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import { CropRotationGroup, setEditedCropRotationGroup, setSelectedCropRotationGroup } from '../../../../../../../redux/slices/cropRotationSlice'
import { useAppDispatch } from '../../../../../../../redux/store'
import EditBox from '/src/assets/icons/edit.svg'
import TrashBox from '/src/assets/icons/delete.svg'
import { CheckCircleFilled } from '@ant-design/icons'

type Props = {
  itemInfo: CropRotationGroup
  active: boolean
}

const CropRotationListItem: React.FC<Props> = ({
  itemInfo,
  active
}) => {
  const dispatch = useAppDispatch()
  const truncatedComment = itemInfo.groupName.length > 30 ? itemInfo.groupName.slice(0, 30) + '...' : itemInfo.groupName

  const selectGroupHandler = () => {
    dispatch(setSelectedCropRotationGroup(itemInfo.id))
  }

  return (
    <div className='cropRotation-list-item'
         onClick={selectGroupHandler}
    >
      <div className='cropRotation-list-item__info'>
        <span className='cropRotation-list-item__info-name'>
          {itemInfo.groupName}
          <CheckCircleFilled
            className='cropRotation-list-item__info-icon'
            style={{ color: active ? '#91C658' : '#434345' }}
          />
        </span>
        <span className='cropRotation-list-item__info-description'>
          {itemInfo.description}
        </span>
      </div>
      <div className='cropRotation-list-item__icons'>
        <img
          className='cropRotation-list-item__icons-item'
          src={EditBox}
          onClick={() => dispatch(setEditedCropRotationGroup(itemInfo.id))}
          alt=''
          title='Редактировать плэйбэк'
        />
        <img
          className='cropRotation-list-item__icons-item'
          // onClick={deleteHandler}
          src={TrashBox}
          alt=''
          title='Удалить плэйбэк'
        />
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
