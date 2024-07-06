export enum WebSocketMessageTypeEvent {
  POSITION = 'position',
  NOTIFICATION = 'notification',
  ACTIVE_STATUS = 'active_status'
}

export type WebSocketMessage = {
  type_event: WebSocketMessageTypeEvent,
  message: EquipmentSocketData
}

export type EquipmentSocketData = {
  imei: string,
  lat: number,
  lon: number,
  date_time: number,
  type: number,
  speed: number,
  direction: number,
  bat: number,
  fuel_s: number | null,
  fuel_s_second: number | null,
  ignition: number,
  sensor: number,
  reserve: string,
  created_at: number
}
