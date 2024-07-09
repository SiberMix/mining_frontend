import type { Notification } from '~widgets/notifications'

export enum WebSocketMessageTypeEvent {
  POSITION = 'position',
  NOTIFICATION = 'notification',
  ACTIVE_STATUS = 'active_status'
}

export type WebSocketMessage = {
  type_event: WebSocketMessageTypeEvent,
  message: EquipmentSocketData | Notification
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

const a = {
  type_event: 'notification',
  message: {
    type: 'info',
    event_name: 'low_fuel',
    message: 'уровень топлива ТРАКТОРА №1 упал ниже 40%',
    created_at: '01.01.2001', //только тут именно объект DATE
    data: {
      equip_id: 11,
      coords: [1234.12, 1234.123]
      // тут может идти любая хуйня, но об этом еще договоримся, чтоб не проебаться
    }
  }
}
