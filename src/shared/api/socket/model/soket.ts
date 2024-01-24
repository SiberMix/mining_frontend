import type { EquipmentSocketData } from '../../../../../srcOld/redux/slices/mapSlice'
import { SocketManager } from './web-socket-manager'

export const soket = new SocketManager<EquipmentSocketData>('ws://myhectare.ru:8765/')
