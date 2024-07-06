import { toast } from 'react-toastify'

import { getAllFields } from '~processes/redux/slices/fieldSlice'
import { getAllEquipment, getAllPolygons } from '~processes/redux/slices/mapSlice'
import { getEquipsModelsList, getTrailerList, getTypesList } from '~processes/redux/slices/optionalEquipmentSlice'
import { getAllPlaybacks } from '~processes/redux/slices/playBackSlice'
import type { AppDispatch } from '~processes/redux/store'

/**
 * Подгружаем всю первоначальную информацию
 * */
type MonitoringInitialLoading = {
  dispatch: AppDispatch,
  setIsLoading: (value: boolean) => void
}

export const monitoringInitialLoading = async ({ dispatch, setIsLoading }: MonitoringInitialLoading) => {

  try {
    await toast.promise(Promise.all([
      dispatch(getAllFields()),
      dispatch(getAllPolygons()),
      dispatch(getAllEquipment()),
      dispatch(getTypesList()),
      dispatch(getEquipsModelsList()),
      dispatch(getTrailerList()),
      dispatch(getAllPlaybacks())
    ]), {
      pending: 'Загружаем информацию с сервера...',
      success: 'Информация успешно загружена',
      error: 'Произошла ошибка при загрузке информации'
    })

    setIsLoading(false)
  } catch (error) {
    console.error('Произошла ошибка при загрузке данных:', error)
  }
}
