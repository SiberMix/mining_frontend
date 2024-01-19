import './SideOutLayout.scss'

import type { FC, PropsWithChildren } from 'react'

export const SideOutLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}
