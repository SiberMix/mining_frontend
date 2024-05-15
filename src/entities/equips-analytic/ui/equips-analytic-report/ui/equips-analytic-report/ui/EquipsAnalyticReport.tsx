import './EquipsAnalyticReport.scss'

import React, { useMemo, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { DefaultDiagram } from '~entities/diagrams'
import { formatDate } from '~shared/lib/format-date'
import { BasePreloader } from '~shared/ui/base-preloader'
import { CustomEmpty } from '~shared/ui/custom-empty'
import { StyledTabs } from '~shared/ui/styled-tabs'

import { equipsAnalytic } from '../../../../../api'
import { useEquipAnalyticStore } from '../../../../../model'
import { filterReportData } from '../../../lib'
import { EquipsAnalyticReportTableRow } from '../../equips-analytic-report-table-row'

export const EquipsAnalyticReport = () => {
  const allEquipList = useEquipAnalyticStore(state => state.allEquipList)
  const pikedEquip = useEquipAnalyticStore(state => state.pikedEquip)
  const reportData = useEquipAnalyticStore(state => state.reportData)

  const [activeTabId, setActiveTabId] = useState(pikedEquip[0]?.equipId.toString())
  const refForWidth = useRef<HTMLDivElement | null>(null)

  const reportDataFiltered = useMemo(() => filterReportData({
    reportData,
    allEquipList,
    id: activeTabId || pikedEquip[0]?.equipId.toString()
  }), [activeTabId, allEquipList, pikedEquip, reportData])

  const {
    isLoading: chartIsLoading,
    data: chartData,
    isError: chartIsError
  } = useQuery(
    ['equipsReportChartData', activeTabId],
    () => equipsAnalytic.getReportChartData({
      equip_id: Number(activeTabId) || pikedEquip[0]?.equipId,
      from: reportData?.from || 0,
      to: reportData?.to || 0
    }),
    {
      keepPreviousData: false,
      retry: false,
      enabled: reportData !== null,
      refetchOnWindowFocus: false
    }
  )

  const {
    series,
    categories
  } = useMemo(() => {
    return Object.entries(chartData || {})
      .reduce((acc, [key, value]) => {
        const sum = (value.Fuel_S || 0) + (value.Fuel_S2 || 0)
        acc.categories.push(key)
        acc.series.push(sum)
        return acc
      }, {
        series: [] as number[],
        categories: [] as string[]
      })
  }, [chartData])

  const equip = useMemo(() => {
    return allEquipList.find(e => e.id === (Number(activeTabId) || pikedEquip[0]?.equipId))
  }, [allEquipList, activeTabId, pikedEquip])

  const tabsWidth = refForWidth.current === null
    ? '300px'
    : refForWidth.current.offsetWidth - 40 + 'px' //40 -> padding

  if (chartIsError) {
    toast.error('Ошибка загрузки графика отчета')
  }

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
      <StyledTabs
        rootClassName='EquipsAnalyticReport_tabs'
        style={{ width: tabsWidth }} //динамически считаем ширину для пагинации в antd
        activeKey={activeTabId}
        onChange={(activeKey: string) => setActiveTabId(activeKey)}
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
            tdArr={['Период отчета', `${formatDate(reportData.from, true)} - ${formatDate(reportData.to, true)}`]}
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
            {
              !chartIsLoading && equip
                ? (
                  <DefaultDiagram
                    className='EquipsAnalyticReport_chart'
                    title='График топлива'
                    categories={categories}
                    series={[
                      {
                        id: equip.id,
                        name: equip.equip_name,
                        data: series
                      }]}
                    isEmpty={chartData === null}
                    withDataLabels={false}
                    withGrid={false}
                    colors={['var(--green-100)']}
                  />
                )
                : (
                  <BasePreloader
                    position='relative'
                    height='300px'
                  />
                )
            }
          </EquipsAnalyticReportTableRow>
        </tbody>
      </table>
    </div>
  )
}
