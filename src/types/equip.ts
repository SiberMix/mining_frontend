export type Equip = {
  equip_type: string,
  id: number,
  equip_model: string,
  equip_name: string,
  gosnomer: string,
  image_status: string,
  imei: string,
  speed: number,
  fuel: number,
  last_coord: {
    lat: string,
    lon: string,
    direction: number,
    last_upd_ts: string
  } | null
};

export type EquipType = {
  id: number,
  status: boolean,
  description: string
};

export type EquipModal = {
  id: number,
  description: string,
  length: string,
  width: string
};

export type EquipTrailer = {
  id: number,
  trailer_name: string,
  gosnomer: string
};

export type EquipImage = {
  id: number,
  image: string
};
