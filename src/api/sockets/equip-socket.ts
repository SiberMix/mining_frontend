import { SocketManager } from './web-socket-manager'
import { EquipEventsSocket, EquipmentSocketData } from '../../redux/slices/mapSlice'

export const equipSockets = {
  equipCoordsSocket: new SocketManager<EquipmentSocketData>('ws://myhectare.ru:8765/'),
  equipEventsSocket: new SocketManager<EquipEventsSocket>('ws://myhectare.ru:8002/ws/event_serv/demobase/')
}
