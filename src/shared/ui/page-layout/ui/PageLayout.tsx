import './PageLayout.scss'

import type { CSSProperties, FC, PropsWithChildren } from 'react'

export const PageLayout: FC<PropsWithChildren & CSSProperties> = ({
  children,
  ...otherStyledProps
}) => {
  return (
    <section
      className='PageLayout'
      style={otherStyledProps}
    >
      {children}
    </section>
  )
}
