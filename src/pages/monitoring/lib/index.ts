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

export const monitoringInitialLoading = async ({ dispatch, setIsLoading, t }: MonitoringInitialLoading) => {
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
      pending: t('Загружаем информацию с сервера...'), // Переведенный текст для ожидания
      success: t('Информация успешно загружена'), // Переведенный текст для успеха
      error: t('Произошла ошибка при загрузке информации') // Переведенный текст для ошибки
    })

    setIsLoading(false)
  } catch (error) {
    console.error('Произошла ошибка при загрузке данных:', error)
  }
}
