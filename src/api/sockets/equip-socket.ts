import { SocketManager } from './web-socket-manager'
import { EquipEventsSocket, EquipmentSocketData } from '../../components/pages/Main/Map/MapEquipments/MapEquipments'

export const equipSockets = {
  equipCoordsSocket: new SocketManager<EquipmentSocketData>('ws://myhectare.ru:8765/'),
  equipEventsSocket: new SocketManager<EquipEventsSocket>('ws://myhectare.ru:8002/ws/event_serv/new_demo_base/')
}
