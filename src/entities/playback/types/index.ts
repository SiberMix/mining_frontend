/**
 * Стейт для стейтменеджера
 * */

export type PlaybackInitialState = {
  playbacksData: CurrentPlaybackData[],
  isOpenPlayBackAddModal: boolean,
  showingPlayback: number | null,
  editedPlayback: CurrentPlaybackData | null,
  setIsOpenPlayBackAddModal: (val: boolean) => void,
  //todo addShowingPlayback & removeShowingPlayback ==== setShowingPlayback
  setShowingPlayback: (val: PlaybackInitialState['showingPlayback']) => void,
  setEditedPlayback: (val: PlaybackInitialState['editedPlayback']) => void,
  getAllPlaybacks: () => void,
  postNewPlayback: (newPlaybackData: PlaybackPostData) => void,
  editeNewPlayback: (idWithData: PlaybackDataForEdit) => void,
  deletePlayback: (id: number) => void
}

/**
 * Все остальное говно
 * */

export type CurrentPlaybackData = {
  id: number,
  name: string,
  color: string,
  time_step: {
    end: number,
    start: number
  },
  equipment: number[],
  equipments_data: PlaybackEquipmentsData[]
}

export type PlaybackPostData = {
  equipment: EquipmentData[],
  name: string,
  time_step: {
    start: number,
    end: number
  }
}

export type EquipmentData = {
  equip_id: number,
  equip_color: string
}

export type PlaybackDataForEdit = {
  id: number,
  newPlaybackData: CurrentPlaybackData
}

export type PlaybackEquipmentsData = {
  id: number,
  imei: string,
  name: string,
  color: string,
  imei_data: imeiData[]
}

export type imeiData = {
  lat: number,
  lon: number,
  ts: number
}
