import React from 'react'
import '../CropRotationList.scss'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import { Collapse } from 'antd/lib'
import { CropRotationGroup, setSelectedCropRotationGroup } from '../../../../../../../redux/slices/cropRotationSlice'
import { useAppDispatch } from '../../../../../../../redux/store'

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
    <div className='cropRotation-list-item'>
      <div className='cropRotation-list-item-icon'
           onClick={selectGroupHandler}
      >
        <Icon
          src='/src/assets/icons/rotation.svg'
          active={active}
        />
      </div>
      <div className='cropRotation-list-item-info'>
        <div className='cropRotation-list-item-name'
             onClick={selectGroupHandler}
        >
          {itemInfo.groupName}
        </div>
        {
          itemInfo.description.length > 0
            ? <Collapse
              className='cropRotation-list-item-description'
              size='small'
              style={{
                color: '#ffffff'
              }}
              items={[{
                key: '1',
                label: 'Описание',
                children: <p className='cropRotation-list-item-description-text'>{itemInfo.description}</p>
              }]}
            />
            : <div className='cropRotation-list-item-description' />
        }
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
