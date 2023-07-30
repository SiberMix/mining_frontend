import { createSelector } from 'reselect'
import { RootState } from '../store'

const selectEquipsData = (state: RootState) => state.equipAnalyticReducer.equipsData
const selectTsStart = (state: RootState) => state.equipAnalyticReducer.tsStart
const selectTsEnd = (state: RootState) => state.equipAnalyticReducer.tsEnd
const selectPikedEquipsId = (state: RootState) => state.equipAnalyticReducer.pikedEquipsId
const selectScheduleType = (state: RootState) => state.equipAnalyticReducer.scheduleType
const selectPikedEquipsColors = (state: RootState) => state.equipAnalyticReducer.pikedEquipsColors
const selectIsLoading = (state: RootState) => state.equipAnalyticReducer.isLoading

export const getEquipsDataSelector = createSelector(
  selectEquipsData,
  (equipsData) => equipsData
)

export const getTsStartSelector = createSelector(
  selectTsStart,
  (tsStart) => tsStart
)

export const getTsEndSelector = createSelector(
  selectTsEnd,
  (tsEnd) => tsEnd
)

export const getPikedEquipsIdSelector = createSelector(
  selectPikedEquipsId,
  (pikedEquipsId) => pikedEquipsId
)

export const getScheduleTypeSelector = createSelector(
  selectScheduleType,
  (scheduleType) => scheduleType
)

export const getPikedEquipsColorsSelector = createSelector(
  selectPikedEquipsColors,
  (pikedEquipsColors) => pikedEquipsColors
)
export const getIsLoadingSelector = createSelector(
  selectIsLoading,
  (isLoading) => isLoading
)
