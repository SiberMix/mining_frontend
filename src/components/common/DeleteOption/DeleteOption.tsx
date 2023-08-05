import './DeleteOption.scss'
import React from 'react'
import TrashBox from '/src/assets/icons/delete.svg'
import { Popconfirm } from 'antd'

type Props = {
  popConfirmTitle?: string,
  popConfirmDescription?: string,
  className: string,
  onDelete: () => void
  title?: string
}

const DeleteOption: React.FC<Props> = ({
  onDelete,
  title,
  className,
  popConfirmTitle,
  popConfirmDescription
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
        className={className}
        src={TrashBox}
        alt=''
        title={title}
      />
    </Popconfirm>
  )
}

export default DeleteOption
