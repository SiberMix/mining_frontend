import { toast } from 'react-toastify'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { equipsAnalytic } from '~entities/equips-analytic/api'
import { getRandomColor } from '~shared/lib/get-random-color'

import { equipsService } from '../../../../../srcOld/api/map/equips'
import type { Equip } from '../../../../../srcOld/redux/slices/mapSlice'
import type { PickedEquip, StoreInitialValues } from '../../types'

export const useEquipAnalyticStore = create<StoreInitialValues>()(immer((set) => ({
  isLoading: true,
  allEquipList: [],
  chartData: null,
  reportData: null,

  pikedEquip: [],
  scheduleType: 'Скорость',
  chartType: 'AVG',

  getAllEquipList: async () => {
    try {
      set({ isLoading: true })
      const allEquipList: Equip[] = await toast.promise(equipsService.getAllEquips(), {
        pending: 'Загрузка техники',
        success: 'Техника загружена',
        error: 'Ошибка при загрузке техники'
      })
      set({ allEquipList: allEquipList })
    } catch (error) {
      console.error(error)
    } finally {
      set({ isLoading: false })
    }
  },
  getEquipsAnalyticData: async (formikValues) => {
    try {
      set({ isLoading: true })
      /** получаем данные для графика и отчета */
      const [
        chartData,
        fuelReportData
      ] = await toast.promise(Promise.all([
        equipsAnalytic.getEquipsAnalytic({
          ts_end: formikValues.time.end,
          ts_start: formikValues.time.start,
          imei_ids: formikValues.pikedEquipsId
        }),
        equipsAnalytic.getFuelReport({
          start: formikValues.time.start,
          end: formikValues.time.end,
          pikedEquipsId: formikValues.pikedEquipsId
        })
      ]), {
        pending: 'Загрузка данных',
        success: 'Данные загружены',
        error: 'Ошибка загрузки данных'
      })

      /** формируем рандомные цвета для выбраненых техник, и достаем их названия */
      const createPickedEquipWithRandomColors = (state: StoreInitialValues): PickedEquip[] => formikValues.pikedEquipsId.map(id => ({
        equipId: id,
        equipColor: getRandomColor(),
        equipName: state.allEquipList.find(equip => equip.id === id)?.equip_name || 'Ошибка'
      }))

      /** сетаем все значения в стор */
      set({ chartData })
      set({ scheduleType: formikValues.scheduleType })
      set({ chartType: formikValues.chartType })
      set((state) => ({
        pikedEquip: createPickedEquipWithRandomColors(state)
      }))
      set({ reportData: fuelReportData })

    } catch (error) {
      console.error(error)
    } finally {
      set({ isLoading: false })
    }
  }
})))
