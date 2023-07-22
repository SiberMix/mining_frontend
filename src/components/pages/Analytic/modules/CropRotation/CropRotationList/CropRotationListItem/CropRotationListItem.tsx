import React from 'react'
import '../CropRotationList.scss'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import { Collapse } from 'antd/lib'

type Props = {
  itemInfo: {
    name: string,
    description: string
  }
}

const CropRotationListItem: React.FC<Props> = ({ itemInfo }) => {

  const truncatedComment = itemInfo.name.length > 30 ? itemInfo.name.slice(0, 30) + '...' : itemInfo.name

  return (
    <div className='cropRotation-list-item'>
      <div className='cropRotation-list-item-icon'>
        <Icon src='/src/assets/icons/rotation.svg' />
      </div>
      <div className='cropRotation-list-item-info'>
        <div className='cropRotation-list-item-name'>
          {itemInfo.name}
        </div>
        <Collapse
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
      </div>
    </div>
  )
}

export default CropRotationListItem

const Icon = styled(SVG)`
  padding: 5px;
  height: 70px;
  width: 70px;
  cursor: pointer;

  path {
    fill: #c5ef75;
  }
`
