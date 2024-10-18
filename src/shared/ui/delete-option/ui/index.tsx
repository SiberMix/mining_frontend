import './index.scss'

import { Popconfirm } from 'antd'
import type { TooltipPlacement } from 'antd/es/tooltip'
import type { CSSProperties, PropsWithChildren } from 'react'
import React, { memo } from 'react'

import TrashBox from '../assets/delete.svg'
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Popconfirm
      className='deleteOption'
      title={popConfirmTitle}
      placement={placement}
      description={popConfirmDescription}
      onConfirm={onDelete}
      okText={t('Да')}
      cancelText={t('Нет')}
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
