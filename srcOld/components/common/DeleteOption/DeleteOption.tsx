import './DeleteOption.scss'

import { Popconfirm } from 'antd'
import type { CSSProperties } from 'react'
import React from 'react'

import TrashBox from '~shared/assets/icons/delete.svg'

type Props = {
  style?: CSSProperties,
  popConfirmTitle?: string,
  popConfirmDescription?: string,
  className?: string,
  onDelete: () => void,
  title?: string
}

const DeleteOption: React.FC<Props> = ({
  onDelete,
  title,
  className,
  popConfirmTitle,
  popConfirmDescription,
  style
}) => {

  return (
    <Popconfirm
      className='deleteOption'
      title={popConfirmTitle}
      placement='right'
      description={popConfirmDescription}
      onConfirm={onDelete}
      okText='Да'
      cancelText='Нет'
    >
      <img
        style={style}
        className={className}
        src={TrashBox}
        alt=''
        title={title}
      />
    </Popconfirm>
  )
}

export default DeleteOption
