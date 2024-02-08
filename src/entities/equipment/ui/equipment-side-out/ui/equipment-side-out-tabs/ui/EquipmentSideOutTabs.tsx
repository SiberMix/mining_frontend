import './EquipmentSideOutTabs.scss'

import * as cn from 'classnames'
import { memo } from 'react'

import type { EquipmentSideOutTabsEnum } from '~entities/equipment/ui/equipment-side-out/ui/equipment-side-out-tabs/const/equipment-side-out-tabs'
import { equipmentSideOutTabs } from '~entities/equipment/ui/equipment-side-out/ui/equipment-side-out-tabs/const/equipment-side-out-tabs'

type EquipmentSideOutTabsProps = {
  activeTab: EquipmentSideOutTabsEnum,
  onChange: (value: EquipmentSideOutTabsEnum) => void
}

export const EquipmentSideOutTabs = memo(({
  activeTab,
  onChange
}: EquipmentSideOutTabsProps) => {
  return (
    <>
      {
        equipmentSideOutTabs.map(({
          id,
          title
        }) => (
          <div
            key={id}
            className={cn(
              'EquipmentSideOutTabs',
              { 'EquipmentSideOutTabs_active': activeTab === id }
            )}
            onClick={() => onChange(id)}
          >
            {title}
          </div>
        ))
      }
    </>
  )
})
