import './EquipsAnalyticReport.scss'

import React, { memo, useMemo, useRef, useState } from 'react'

import { DefaultDiagram } from '~entities/diagrams'
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
    return allEquipList.find(e => e.id === Number(activeTabId))
  }, [allEquipList, activeTabId])

  // todo исправить входные данные
  // const {
  //   categories,
  //   seriesData
  // } = useMemo(() => formatForReportChart({
  //   firstArr: reportDataFiltered?.fueling_count || null,
  //   secondArr: reportDataFiltered?.total_refuel_fill || null
  // }), [reportDataFiltered])

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
          {/*todo убрать или добавить*/}
          {/*<EquipsAnalyticReportTableRow*/}
          {/*  tdArr={['Датчик', '{какие то данные}']}*/}
          {/*/>*/}
          {/*<EquipsAnalyticReportTableRow*/}
          {/*  tdArr={['Период отчета', '{какие то данные}']}*/}
          {/*/>*/}
          {/*<EquipsAnalyticReportTableRow*/}
          {/*  tdArr={['Пользователь', '{какие то данные}']}*/}
          {/*/>*/}
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
          {/*todo убрать или добавить*/}
          {/*<EquipsAnalyticReportTableRow*/}
          {/*  tdArr={['Итоговый расход', '{какие то данные}', 'Расчетный расход', '{какие то данные}']}*/}
          {/*/>*/}
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
          {/*todo убрать или добавить*/}
          {/*<EquipsAnalyticReportTableRow*/}
          {/*  tdArr={['Средний расход на 100км', '{какие то данные}', 'Средний расход на 1 час работы двигателя', '{какие то данные}']}*/}
          {/*/>*/}
          {/*<EquipsAnalyticReportTableRow*/}
          {/*  tdArr={['Расход доп потребителя', '{какие то данные}']}*/}
          {/*/>*/}
        </tbody>
      </table>
      {/**
       График уровня топлива в баке от времени
       */}
      <table className='EquipsAnalyticReport_main-data'>
        <thead>
          <tr>
            <th colSpan={4}>
              Уровень топлива в баке от времени
            </th>
          </tr>
        </thead>
        <tbody>
          <EquipsAnalyticReportTableRow>
            <DefaultDiagram
              className='EquipsAnalyticReport_chart'
              title='График топлива'
              categories={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              series={[{
                name: equip?.equip_name,
                data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 1)
              }]}
            />
          </EquipsAnalyticReportTableRow>
        </tbody>
      </table>
    </div>
  )
})
