import './SettingsGeneral.scss'

import { useField } from 'formik'
import React, { memo } from 'react'

import { SimpleSelect } from '~shared/ui/simple-select'
import { MonitoringConfigEnum } from '~features/navbar';
import { useTranslation } from 'react-i18next';

export const SettingsGeneral = memo(() => {
  const [field, _, helpers] = useField('monitoringStartMenuSection')
  // Создаем массив с использованием функции t
  const { t } = useTranslation();
  const startSidebarOptions: Array<{ value: MonitoringConfigEnum | null, label: string }> = [
    {
      value: null,
      label: t('Не выбрано')
    },
    {
      value: MonitoringConfigEnum.polygon_list,
      label: t('Список полигонов')
    },
    {
      value: MonitoringConfigEnum.tasks,
      label: t('Задачи')
    },
    {
      value: MonitoringConfigEnum.equipment_list,
      label: t('Техника')
    },
    {
      value: MonitoringConfigEnum.play_back,
      label: t('Плэйбэки')
    },
    {
      value: MonitoringConfigEnum.field_list,
      label: t('Культуры')
    }
  ];
  const initialStartSidebarOptions = startSidebarOptions.find(option => option.value === field?.value)

  return (
    <div className='settingsGeneralWrapper'>
      <div className='settingsGeneral'>
        <div className='settingsGeneralSidebar'>
          <span>
            {t("Стартовая страница меню")}
          </span>
          <SimpleSelect
            options={startSidebarOptions}
            initialValue={initialStartSidebarOptions ? initialStartSidebarOptions.label : 'произошла ошибка'}
            handleOnChange={(value) => helpers.setValue(value)}
          />
        </div>
      </div>
    </div>
  )
})
