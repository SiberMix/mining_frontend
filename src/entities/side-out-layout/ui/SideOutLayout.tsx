import './SideOutLayout.scss'

import classNames from 'classnames'
import type { FC, PropsWithChildren } from 'react'

type SideOutLayoutProps = {
  className?: classNames.ArgumentArray | string
} & PropsWithChildren

export const SideOutLayout: FC<SideOutLayoutProps> = ({
  className,
  children
}) => {
  return (
    <div className={classNames('SideOutLayout', className)}>
      {children}
    </div
    >
  )
}
