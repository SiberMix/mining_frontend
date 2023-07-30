import { axiosInstanceWithoutV1 } from '../abstract'

const EquipsAnalytic = {
  getEquipsAnalytic: (data: { ts_start: number, ts_end: number, imei_ids: number[] }) => {
    const {
      ts_end,
      imei_ids,
      ts_start
    } = data //пришлось округлять до с, потому что беку сложно

    return axiosInstanceWithoutV1.post('/tractors_avg_speed/', {
      ts_start: Math.round(ts_start / 1000),
      ts_end: Math.round(ts_start / 1000),
      imei_ids
    })
  }
}

export default EquipsAnalytic
