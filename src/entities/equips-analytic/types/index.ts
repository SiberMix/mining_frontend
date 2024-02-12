import type { Equip } from '../../../srcOld/redux/slices/mapSlice'

export type StoreInitialValues = {
  isLoading: boolean,
  allEquipList: Equip[],
  pikedEquip: PickedEquip[],
  chartData: ChartData | null,
  getAllEquipList: () => void,
  getEquipsAnalyticData: (value: FormikInitialValues) => void,

  scheduleType: ScheduleType,
  chartType: ChartType,

  reportData: ReportData | null
}
export type ScheduleType = 'Скорость' | 'Тип'
export type PeriodType = 'День' | 'Неделя' | 'Месяц' | 'Свой вариант'
export type ChartType = 'AVG' | 'MEDIAN'
export type Timestamp = {
  start: number,
  end: number
}
export type PickedEquip = {
  equipId: number,
  equipColor: string,
  equipName: string
}
export type FormikInitialValues = {
  scheduleType: ScheduleType,
  chartType: ChartType,
  pikedEquipsId: number[],
  period: PeriodType,
  time: Timestamp
}
//ключ - это дата в виде "1700784000"
export type ChartData = Record<string, EquipDataForChart[]>
export type EquipDataForChart = {
  id: number,
  imei_str: string,
  avg_speed: number | null,
  avg_fuel: number | null,
  median_speed: number | null,
  median_fuel: number | null
}
export type ReportData = {
  //Record<IMEI, value>
  distance: Record<number, number>,
  initial_volume: Record<number, number>,
  average_speed: Record<number, number>,
  final_volume: Record<number, number>,
  min_volume: Record<number, number>,
  max_volume: Record<number, number>,
  fueling_count: Record<
    number,
    Record<string, number>
  >,
  average_consumption: Record<number, number>,
  total_refuel_fill: Record<
    number, //IMEI
    Record<string, number> //1 - это номер точки (s_1,2...) 2 - это значение для точки
  >,
  total: {
    total_distance: number,
    total_speed_records_all: number
  },
  from: number,
  to: number
}
//тупо копипаста
export type FilterReportDataReturn = {
  distance: number,
  initial_volume: number,
  average_speed: number,
  final_volume: number,
  min_volume: number,
  max_volume: number,
  fueling_count: Record<string, number>,
  average_consumption: number,
  total_refuel_fill: Record<string, number>,
  total: {
    total_distance: number,
    total_speed_records_all: number
  },
  from: number,
  to: number
}

export type ReportChartData = Record<string, { Fuel_S: null | number, Fuel_S2: number | null }>
