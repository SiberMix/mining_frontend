import './EquipmentSideOutTabs.scss';

import cn from 'classnames';
import { memo } from 'react';

import type {
  EquipmentSideOutTabsEnum
} from '~entities/equipment/ui/equipment-side-out/ui/equipment-side-out-tabs/const/equipment-side-out-tabs';
import {
  equipmentSideOutTabs
} from '~entities/equipment/ui/equipment-side-out/ui/equipment-side-out-tabs/const/equipment-side-out-tabs';
import { useTranslation } from 'react-i18next';

type EquipmentSideOutTabsProps = {
  activeTab: EquipmentSideOutTabsEnum,
  onChange: (value: EquipmentSideOutTabsEnum) => void
}

export const EquipmentSideOutTabs = memo(({
                                            activeTab,
                                            onChange
                                          }: EquipmentSideOutTabsProps) => {
  const { t } = useTranslation(); // Хук для доступа к переводу
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
              { EquipmentSideOutTabs_active: activeTab === id }
            )}
            onClick={() => onChange(id)}
          >
            {t(title)}
          </div>
        ))
      }
    </>
  );
});
