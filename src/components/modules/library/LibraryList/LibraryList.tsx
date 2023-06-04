import s from './LibraryList.module.scss'
import style from '../../field/FieldList/FieldList.module.scss'
import * as cn from 'classnames'
import React from 'react'
import {
  atom,
  useAtom
} from 'jotai'

import Equipments from '../Equipment/Equipments'
import Models from '../Models/Models'
import EquipmentTypesComponent from '../Types/Types'
import Trailer from '../Trailer/Trailer'

type Props = {}

export const LibraryListStateAtom = atom({
  isEquipmentListOpen: true,
  isEquipmentTypeListOpen: false,
  isEquipmentModelListOpen: false,
  isTrailerModelListOpen: false
})

const LibraryList: React.FC<Props> = () => {
  const [libraryListState, setLibraryListState] = useAtom(LibraryListStateAtom)

  const changeState = (key: keyof typeof libraryListState) => () => {
    setLibraryListState((prevState) => {
      const newState = Object.keys(prevState).reduce<any>((acc, keys) => {
        acc[keys] = false
        return acc
      }, {} as typeof libraryListState)

      newState[key] = true
      return newState
    })
  }

  return (
    <div className={cn(style.noScrollBar, s.root)}>
      <div className={cn(s.libraries)}>
        <div className={cn(s.header)}>
          <div
            className={cn(
              s.library,
              { [s.libraryActive]: libraryListState.isEquipmentListOpen }
            )}
            onClick={changeState('isEquipmentListOpen')}
          >
            Оборудование
          </div>
          <div
            className={cn(
              s.library,
              { [s.libraryActive]: libraryListState.isEquipmentTypeListOpen }
            )}
            onClick={changeState('isEquipmentTypeListOpen')}
          >
            Тип
          </div>
          <div
            className={cn(
              s.library,
              { [s.libraryActive]: libraryListState.isEquipmentModelListOpen }
            )}
            onClick={changeState('isEquipmentModelListOpen')}
          >
            Модель
          </div>
          <div
            className={cn(
              s.library,
              { [s.libraryActive]: libraryListState.isTrailerModelListOpen }
            )}
            onClick={changeState('isTrailerModelListOpen')}
          >
            Навесное
          </div>
        </div>
      </div>
      {libraryListState.isEquipmentListOpen ? <Equipments /> : null}
      {libraryListState.isEquipmentTypeListOpen ? <EquipmentTypesComponent /> : null}
      {libraryListState.isEquipmentModelListOpen ? <Models /> : null}
      {libraryListState.isTrailerModelListOpen ? <Trailer /> : null}
    </div>
  )
}

export default LibraryList
