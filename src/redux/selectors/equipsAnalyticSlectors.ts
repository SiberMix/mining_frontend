import type { RootState } from "../store"

export const getEquipsDataForChartsSelector = (state: RootState) => state.equipAnalyticReducer.equipsDataForCharts
export const getPikedEquipsIdSelector = (state: RootState) => state.equipAnalyticReducer.pikedEquips
export const getScheduleTypeSelector = (state: RootState) => state.equipAnalyticReducer.scheduleType
export const getIsLoadingSelector = (state: RootState) => state.equipAnalyticReducer.isLoading
export const getEquipColorsUsingInDiagramsSelector = (state: RootState) => state.equipAnalyticReducer.equipColorsUsingInDiagrams
export const getChartTypeSelector = (state: RootState) => state.equipAnalyticReducer.chartType
