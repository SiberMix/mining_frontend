import s from './FieldList.module.scss'
import * as cn from 'classnames'
import React from 'react'
import {
  atom,
  useAtom
} from 'jotai'
import FieldPreview from '../FieldPreview/FieldPreview'

export const FieldListStateAtom = atom({
  isFieldListOpen: true
})

const FieldList: React.FC = () => {
  const [fieldListState, setFieldListState] = useAtom(FieldListStateAtom)

  const changeState = (key: keyof typeof fieldListState) => () => {
    setFieldListState((prevState) => {
      const newState = Object.keys(prevState).reduce<any>((acc, keys) => {
        acc[keys] = false
        return acc
      }, {} as typeof fieldListState)

      newState[key] = true
      return newState
    })
  }

  return (
    <div className={cn(s.root, s.noScrollBar)}>
      <div className={cn(s.libraries)}>
        <p style={{ textAlign: 'center' }}>
          <b>
            Культура
          </b>
        </p>
      </div>
      {fieldListState.isFieldListOpen ? <FieldPreview /> : null}
    </div>
  )
}

export default FieldList
