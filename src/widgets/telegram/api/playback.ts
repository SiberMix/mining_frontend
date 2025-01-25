import type {
  CurrentPlaybackData,
  PlaybackPostData,
} from '~processes/redux/slices/playBackSlice';
import { axiosInstance } from '~shared/api/axios-instance';

export const telegramService = {
  /*
   * Получаем плейбэки
   * */
  getOnlineDriver: () => {
    return axiosInstance.get('/telegram/get_online_driver/');
  },
};
