import type { Equip } from '../../../../../srcOld/redux/slices/mapSlice'
import type { FilterReportDataReturn, ReportData } from '../../../types'

type FilterReportData = {
  id: string,
  allEquipList: Equip[],
  reportData: ReportData | null
}

export function filterReportData({
  id,
  reportData,
  allEquipList
}: FilterReportData): FilterReportDataReturn | null {
  const equipImei = allEquipList.find(e => e.id === Number(id))?.imei

  if (!equipImei || !reportData) return null

  const reportDataKeys = Object.entries(reportData)

  return reportDataKeys.reduce((acc, [key, value]) => {
    if (key === 'total') {
      //сори, я заебался типизировать
      (acc as any)[key] = value
    }

    //сори, я заебался типизировать
    (acc as any)[key] = (reportData as any)[key][equipImei]

    return acc
  }, {} as FilterReportDataReturn)
}
