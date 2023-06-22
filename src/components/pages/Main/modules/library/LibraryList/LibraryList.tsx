import './LibraryListCSSTransition.scss'
import s from './LibraryList.module.scss'
import style from '../../field/FieldList/FieldList.module.scss'
import * as cn from 'classnames'
import React from 'react'

import Equipments from '../Equipment/Equipments'
import Models from '../Models/Models'
import EquipmentTypesComponent from '../Types/Types'
import Trailer from '../Trailer/Trailer'
import {
  optionalEquipmentOpenWindowSelector
} from '../../../../../../redux/selectors/optionalEquipmentSelectors'
import { useSelector } from 'react-redux'
import {
  CSSTransition,
  SwitchTransition
} from 'react-transition-group'
import { useAppDispatch } from '../../../../../../redux/store'
import {
  setOpenOptionalEquipmentWindow
} from '../../../../../../redux/slices/optionalEquipmentSlice'

type Props = {}

const LibraryList: React.FC<Props> = () => {
  const dispatch = useAppDispatch()

  const optionalEquipmentOpenWindow = useSelector(optionalEquipmentOpenWindowSelector)

  return (
    <div className={cn(style.noScrollBar, s.root)}>
      <div className={cn(s.libraries)}>
        <div className={cn(s.header)}>
          <div
            className={cn(
              s.library,
              { [s.libraryActive]: optionalEquipmentOpenWindow === 'EquipmentList' }
            )}
            onClick={() => dispatch(setOpenOptionalEquipmentWindow('EquipmentList'))}
          >
            Оборудование
          </div>
          <div
            className={cn(
              s.library,
              { [s.libraryActive]: optionalEquipmentOpenWindow === 'EquipmentTypeList' }
            )}
            onClick={() => dispatch(setOpenOptionalEquipmentWindow('EquipmentTypeList'))}
          >
            Тип
          </div>
          <div
            className={cn(
              s.library,
              { [s.libraryActive]: optionalEquipmentOpenWindow === 'EquipmentModelList' }
            )}
            onClick={() => dispatch(setOpenOptionalEquipmentWindow('EquipmentModelList'))}
          >
            Модель
          </div>
          <div
            className={cn(
              s.library,
              { [s.libraryActive]: optionalEquipmentOpenWindow === 'TrailerModelList' }
            )}
            onClick={() => dispatch(setOpenOptionalEquipmentWindow('TrailerModelList'))}
          >
            Навесное
          </div>
        </div>
      </div>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={optionalEquipmentOpenWindow}
          classNames="library-list-fade"
          timeout={280}
        >
          {optionalEquipmentOpenWindow === 'EquipmentList'
            ? <Equipments />
            : optionalEquipmentOpenWindow === 'EquipmentTypeList'
              ? <EquipmentTypesComponent />
              : optionalEquipmentOpenWindow === 'EquipmentModelList'
                ? <Models />
                : optionalEquipmentOpenWindow === 'TrailerModelList'
                  ? <Trailer />
                  : <></>}
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

export default LibraryList
