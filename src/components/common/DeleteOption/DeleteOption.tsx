import './DeleteOption.scss'
import React, { CSSProperties } from 'react'
import TrashBox from '/src/assets/icons/delete.svg'
import { Popconfirm } from 'antd'

type Props = {
  style?: CSSProperties
  popConfirmTitle?: string,
  popConfirmDescription?: string,
  className?: string,
  onDelete: () => void
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
