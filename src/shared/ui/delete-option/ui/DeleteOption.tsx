import './DeleteOption.scss'

import { Popconfirm } from 'antd'
import type { TooltipPlacement } from 'antd/es/tooltip'
import type { CSSProperties, PropsWithChildren } from 'react'
import React, { memo } from 'react'

import TrashBox from '~shared/assets/icons/delete.svg'

type DeleteOptionProps = {
  style?: CSSProperties,
  popConfirmTitle?: string,
  popConfirmDescription?: string,
  className?: string,
  onDelete: () => void,
  title?: string,
  placement?: TooltipPlacement
} & PropsWithChildren

export const DeleteOption = memo(({
  onDelete,
  title,
  className,
  popConfirmTitle,
  popConfirmDescription = 'Вы уверены?',
  style,
  placement = 'right',
  children
}: DeleteOptionProps) => {

  return (
    <Popconfirm
      className='deleteOption'
      title={popConfirmTitle}
      placement={placement}
      description={popConfirmDescription}
      onConfirm={onDelete}
      okText='Да'
      cancelText='Нет'
    >
      {
        children
          ? children
          : <img
            style={style}
            className={className}
            src={TrashBox}
            alt=''
            title={title}
          />
      }
    </Popconfirm>
  )
})
