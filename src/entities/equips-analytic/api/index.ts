import { axiosInstance, axiosInstanceWithoutV1 } from '~shared/api/axios-instance'

import type { ChartData, ReportData, Timestamp } from '../types'

export const equipsAnalytic = {
  getEquipsAnalytic: async ({
    ts_end,
    imei_ids,
    ts_start
  }: { ts_start: number, ts_end: number, imei_ids: number[] }): Promise<ChartData> => {

    //пришлось округлять до с, потому что беку сложно
    const response = await axiosInstanceWithoutV1.post('/tractors_avg_speed/', {
      ts_start: Math.round(ts_start / 1000),
      ts_end: Math.round(ts_end / 1000),
      imei_ids
    })

    return response.data
  },
  getFuelReport: async ({
    start,
    end,
    pikedEquipsId
  }: Timestamp & { pikedEquipsId: number[] }): Promise<ReportData> => {
    const response = await axiosInstance.post('/reports/fuel_report/', {
      from: Math.round(start / 1000),
      to: Math.round(end / 1000),
      equips_ids_list: pikedEquipsId
    })
    return response.data
  },
  getReportChartData: async ({
    equip_id,
    to,
    from
  }: { from: number, to: number, equip_id: number }) => {
    const response = await axiosInstance.post('/reports/fuel_report-detail/', {
      from,
      to,
      equip_id
    })

    return response.data
  }
}
