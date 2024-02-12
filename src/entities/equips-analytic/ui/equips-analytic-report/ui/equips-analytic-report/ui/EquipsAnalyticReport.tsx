import './EquipsAnalyticReport.scss'

import React, { memo, useMemo, useRef, useState } from 'react'

import { EquipsAnalyticReportChart } from '~entities/equips-analytic/ui/equips-analytic-report/ui/equips-analytic-report-chart'
import { CustomEmpty } from '~shared/ui/custom-empty'
import { TabsStyled } from '~shared/ui/tabs-styled'

import { useEquipAnalyticStore } from '../../../../../model'
import { filterReportData } from '../../../lib'
import { EquipsAnalyticReportTableRow } from '../../equips-analytic-report-table-row'

export const EquipsAnalyticReport = memo(() => {
  const allEquipList = useEquipAnalyticStore(state => state.allEquipList)
  const pikedEquip = useEquipAnalyticStore(state => state.pikedEquip)
  const reportData = useEquipAnalyticStore(state => state.reportData)

  const [activeTabId, setActiveTabId] = useState(pikedEquip[0]?.equipId.toString())
  const refForWidth = useRef<HTMLDivElement | null>(null)

  const reportDataFiltered = useMemo(() => filterReportData({
    reportData,
    allEquipList,
    id: activeTabId || pikedEquip[0]?.equipId.toString()
  }), [activeTabId, allEquipList, reportData])

  const equip = useMemo(() => {
    return allEquipList.find(e => e.id === (Number(activeTabId) || pikedEquip[0]?.equipId))
  }, [allEquipList, activeTabId, reportData])

  const onChangeTabs = (activeKey: string) => {
    setActiveTabId(activeKey)
  }

  const tabsWidth = refForWidth.current === null
    ? '300px'
    : refForWidth.current.offsetWidth - 40 + 'px' //40 -> padding

  if (reportData === null) {
    return (
      <div
        className='EquipsAnalyticReport EquipsAnalyticReport_centered'
        ref={refForWidth} //реф все равно нужен, иначе едут табы
      >
        <CustomEmpty />
      </div>
    )
  }

  return (
    <div
      className='EquipsAnalyticReport'
      ref={refForWidth}
    >
      {/**
       Табы для разной техники из отчета
       */}
      <TabsStyled
        rootClassName='EquipsAnalyticReport_tabs'
        style={{ width: tabsWidth }} //динамически считаем ширину для пагинации в antd
        activeKey={activeTabId}
        onChange={onChangeTabs}
        type='card'
        items={pikedEquip.map(equip => ({
          label: equip.equipName,
          key: equip.equipId.toString()
        }))}
      />
      {/**
       таблица дозаправок и дозаливок
       */}
      <table className='EquipsAnalyticReport_refill'>
        <thead>
          <tr>
            <th colSpan={2}>
              Заправки и сливы топлива
            </th>
          </tr>
        </thead>
        <tbody>
          <EquipsAnalyticReportTableRow
            tdArr={['Объект', equip?.equip_name]}
          />
          <EquipsAnalyticReportTableRow
            tdArr={['Гос. номер', equip?.gosnomer]}
          />
          <EquipsAnalyticReportTableRow
            tdArr={['Период отчета', equip?.gosnomer]}
          />
        </tbody>
      </table>
      {/**
       таблица итоговых данных
       */}
      <table className='EquipsAnalyticReport_main-data'>
        <thead>
          <tr>
            <th colSpan={4}>
              Итоговые данные
            </th>
          </tr>
        </thead>
        <tbody>
          <EquipsAnalyticReportTableRow
            tdArr={['Пробег', reportDataFiltered?.distance, 'Средняя скорость', reportDataFiltered?.average_speed]}
          />
          <EquipsAnalyticReportTableRow
            tdArr={['Начальный объем', reportDataFiltered?.initial_volume, 'Конечный объем', reportDataFiltered?.final_volume]}
          />
          <EquipsAnalyticReportTableRow
            tdArr={['Минимальный объем', reportDataFiltered?.min_volume, 'Максимальный объем', reportDataFiltered?.max_volume]}
          />
          <EquipsAnalyticReportTableRow
            tdArr={[
              'Количество заправок',
              Object.keys(reportDataFiltered?.fueling_count || {}).length, //почему то не дает вывести просто length
              'Количество сливов',
              Object.keys(reportDataFiltered?.total_refuel_fill || {}).length
            ]}
          />
          <EquipsAnalyticReportTableRow
            tdArr={[
              'Объем заправок',
              Object.values(reportDataFiltered?.fueling_count || {})
                ?.reduce((a, b) => a + b, 0),
              'Объем сливов',
              Object.values(reportDataFiltered?.total_refuel_fill || {})
                ?.reduce((a, b) => a + b, 0)
            ]}
          />
        </tbody>
      </table>
      {/**
       График уровня топлива в баке от времени
       */}
      <EquipsAnalyticReportChart
        tableClassName='EquipsAnalyticReport_main-data'
        activeTabId={activeTabId}
        defaultTab={pikedEquip[0]?.equipId}
        enabled={reportData !== null}
        equipName={equip?.equip_name}
        from={reportData.from}
        to={reportData.to}
      />
    </div>
  )
})
