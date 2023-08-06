import { createSelector } from 'reselect'
import { RootState } from '../store'

const selectEquipsData = (state: RootState) => state.equipAnalyticReducer.equipsData
const selectPikedEquips = (state: RootState) => state.equipAnalyticReducer.pikedEquips
const selectScheduleType = (state: RootState) => state.equipAnalyticReducer.scheduleType
const selectIsLoading = (state: RootState) => state.equipAnalyticReducer.isLoading
const selectEquipsUsingInDiagrams = (state: RootState) => state.equipAnalyticReducer.equipsUsingInDiagrams
const selectChartType = (state: RootState) => state.equipAnalyticReducer.chartType

export const getEquipsDataSelector = createSelector(
  selectEquipsData,
  (equipsData) => equipsData
)
export const getPikedEquipsIdSelector = createSelector(
  selectPikedEquips,
  (pikedEquipsId) => pikedEquipsId
)

export const getScheduleTypeSelector = createSelector(
  selectScheduleType,
  (scheduleType) => scheduleType
)

export const getIsLoadingSelector = createSelector(
  selectIsLoading,
  (isLoading) => isLoading
)

export const getEquipsUsingInDiagrams = createSelector(
  selectEquipsUsingInDiagrams,
  (equipsUsingInDiagrams) => equipsUsingInDiagrams
)

export const getChartType = createSelector(
  selectChartType,
  (chartType) => chartType
)
