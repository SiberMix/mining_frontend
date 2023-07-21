import React from 'react'
import '../CropRotationList.scss'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'

type Props = {
  listItemName: string
}

const CropRotationListItem: React.FC<Props> = ({ listItemName }) => {

  const truncatedComment = listItemName.length > 30 ? listItemName.slice(0, 30) + '...' : listItemName

  return (
    <div className='cropRotation-list-item'>
      <div className='cropRotation-list-item-icon'>
        <Icon src='/src/assets/icons/rotation.svg' />
      </div>
      <div>

      </div>
    </div>
  )
}

export default CropRotationListItem

const Icon = styled(SVG)`
  padding: 5px;
  height: 70px;
  width: 70px;
  margin-right: 30px;
  cursor: pointer;

  path {
    fill: #c5ef75;
  }
`
