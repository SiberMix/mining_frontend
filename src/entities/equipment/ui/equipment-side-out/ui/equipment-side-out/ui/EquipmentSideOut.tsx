import './EquipmentSideOutCSSTransition.scss'
import './EquipmentSideOut.scss'

import React, { memo, useCallback, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { SideOutLayout } from '~entities/side-out-layout'

import { EquipModelList } from '../../../../equip-model-list'
import { EquipTrailerList } from '../../../../equip-trailer-list'
import { EquipsTypesList } from '../../../../equip-types-list'
import { EquipmentList } from '../../../../equipment-list'
import { EquipmentSideOutTabs, EquipmentSideOutTabsEnum } from '../../equipment-side-out-tabs'

export const EquipmentSideOut = memo(() => {
  const [activeTab, setActiveTab] = useState(EquipmentSideOutTabsEnum.EQUIPMENT_LIST)

  const onChangeHandler = useCallback(setActiveTab, [])

  return (
    <SideOutLayout className='EquipmentSideOut'>
      <div className='EquipmentSideOut__libraries'>
        <div className='EquipmentSideOut__header'>
          <EquipmentSideOutTabs
            activeTab={activeTab}
            onChange={onChangeHandler}
          />
        </div>
      </div>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={activeTab}
          classNames='library-list-fade'
          timeout={280}
        >
          {
            activeTab === EquipmentSideOutTabsEnum.EQUIPMENT_LIST
              ? <EquipmentList />
              : activeTab === EquipmentSideOutTabsEnum.EQUIPMENT_TYPE_LIST
                ? <EquipsTypesList />
                : activeTab === EquipmentSideOutTabsEnum.EQUIPMENT_MODEL_LIST
                  ? <EquipModelList />
                  : activeTab === EquipmentSideOutTabsEnum.EQUIPMENT_TRAILER_LIST
                    ? <EquipTrailerList />
                    : <></>
          }
        </CSSTransition>
      </SwitchTransition>
    </SideOutLayout>
  )
})
