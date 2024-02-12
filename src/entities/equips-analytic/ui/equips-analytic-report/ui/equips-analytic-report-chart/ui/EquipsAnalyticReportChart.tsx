import './EquipsAnalyticReportChart.scss'

import React, { memo } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { DefaultDiagram } from '~entities/diagrams'
import { equipsAnalytic } from '~entities/equips-analytic/api'
import { EquipsAnalyticReportTableRow } from '~entities/equips-analytic/ui/equips-analytic-report/ui/equips-analytic-report-table-row'
import { BasePreloader } from '~shared/ui/base-preloader'

type EquipsAnalyticReportChartProps = {
  tableClassName: string,
  activeTabId: string,
  defaultTab: number,
  enabled: boolean,
  equipName: string | undefined,
  from: number,
  to: number
}

export const EquipsAnalyticReportChart = memo(({
  tableClassName,
  activeTabId,
  defaultTab,
  enabled,
  equipName,
  from,
  to
}: EquipsAnalyticReportChartProps) => {
  console.log(from)
  console.log(to)

  const {
    isLoading: chartIsLoading,
    data: chartData,
    isError: chartIsError
  } = useQuery(
    ['equipsReportChartData', activeTabId],
    () => equipsAnalytic.getReportChartData({
      equip_id: Number(activeTabId) || defaultTab,
      from: from,
      to: to
    }),
    {
      keepPreviousData: true,
      enabled: enabled,
      retry: false,
      onSuccess: data => {
        console.log('data', data)

        return [1234]
      }
    }
  )

  if (chartIsError) {
    toast.error('Ошибка загрузки графика')
  }

  return (
    <table className={tableClassName}>
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
            chartIsLoading
              ? <BasePreloader
                position='relative'
                height='300px'
                />
              : <DefaultDiagram
                className='EquipsAnalyticReport_chart'
                title='График топлива'
                categories={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                series={[{
                  name: equipName,
                  data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 1)
                }]}
                isEmpty={chartIsError}
                />
          }
        </EquipsAnalyticReportTableRow>
      </tbody>
    </table>
  )
})
