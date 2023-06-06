import s from './FieldList.module.scss'
import * as cn from 'classnames'
import React from 'react'
import FieldPreview from '../FieldPreview/FieldPreview'

const FieldList: React.FC = () => {

  return (
    <div className={cn(s.root, s.noScrollBar)}>
      <div className={cn(s.libraries)}>
        <p style={{ textAlign: 'center' }}>
          <b>
            Культура
          </b>
        </p>
      </div>
      <FieldPreview />
    </div>
  )
}

export default FieldList
