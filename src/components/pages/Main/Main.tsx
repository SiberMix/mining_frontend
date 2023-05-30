import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import {
  Input,
  Modal
} from 'antd'

import {
  atom,
  useAtom,
  useSetAtom
} from 'jotai'
import MainLayout from './MainLayout/MainLayout'
import type { Polygon as PolygonType } from '../../../types'

import { SidebarStateAtom } from './Sidebar/Sidebar'
import type { Equip } from '../../../types/equip'

import './styles.css'
import { mapService } from '../../../api/map'
import Preloader from '../../common/preloader/Preloader'
import SidebarContainer from './Sidebar/SidebarContainer'
import Map from './Map/Map'
import { MapContainer } from 'react-leaflet'
import * as cn from 'classnames'
import s from './Map/Map.module.scss'

export const polygonsAtom = atom<PolygonType[]>([])
export const Equipments = atom<Equip[]>([])
export const isDrawingAtom = atom(false)
export const isFetchingAtom = atom(false)
export const fieldTypesAtom = atom([])

function trianglesCheck<T>(arr: T[]) {
  if (arr.length < 5) {
    alert(`Необходимо указать не менее 4 точек на карте! 
    Вы указали: ${arr.length - 1}`)
    return false
  }
  return true
}

const MainPage = () => {
  const [load, setLoad] = useState(true)

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => setLoad(false), 2500)
  }, [])

  const ref = useRef<any>(null)
  const [polygons, setPolygons] = useAtom(polygonsAtom)
  const [fieldTypes, setFieldTypes] = useAtom(fieldTypesAtom)

  const setIsFetching = useSetAtom(isFetchingAtom)
  const [polygonData, setPolygonData] = useState<PolygonType | null>(null)
  const [sidebarState] = useAtom<any>(SidebarStateAtom)

  const [polygonName, setPolygonName] = useState('')
  const [equipmentList, setEquipmentList] = useState<Equip[]>([])

  useEffect(() => {
    // Получаем список оборудования с имей через API
    mapService.getEquips().then(data => setEquipmentList(data.data))
  }, [])

  const [visibleModal, setVisibleModal] = useState(false)

  useEffect(() => {
    ((async () => {
      const fieldTypes = await mapService.getFieldList()
      setFieldTypes(fieldTypes.data)
      console.log('fieldTypes', fieldTypes.data)
      const polygons = await mapService.getPolygons()
      setPolygons(polygons.data)
      console.log('polygons', polygons.data)
    }))()
  }, [setFieldTypes, setPolygons])

  const handleCancel = () => {
    setVisibleModal(false)
    setPolygonName('')
  }

  const addPolygon = (event: any) => {
    try {
      if (event.handled) return

      event.handled = true
      const coords = event.get('target').geometry.getCoordinates()

      const coords_len = coords[0].length

      const start_polygon = coords[0][0]
      const end_polygon = coords[0][coords_len - 1]

      if (start_polygon !== end_polygon) {
        console.log(`Коортинаты полигона: ${coords}`)
        alert('Что-то пошло не так, этого не могло произойти')
        return
      }

      if (coords_len < 5) {
        if (coords_len === 0) {
          return
        }
        alert(`Необходимо указать не менее 4 точек на карте! Вы указали: ${coords_len - 1}`)
        return
      }

      const id = Math.random().toString(36).substr(2, 9)

      const polygon: any = {
        id,
        coords: coords[0],
        name: polygonName,
        active: '1',
        sequence: '1',
        inner_coords: 0
      }

      setPolygonData(polygon)
      setVisibleModal(true)
    } catch {
      console.log('error')
    } finally {
      setIsFetching(false)
    }
  }

  const editPolygonHandler = (id: string | number) => {

    let edit = true

    ref.current.geoObjects.each((polygon: any) => {
      if (polygon.properties.get('id') === id) {
        const middleCoords = polygons.find((p) => p.id === id)?.middle_coord
        ref.current?.setCenter(middleCoords, 14)
        polygon.editor.startEditing()
        polygon.editor.events.add('drawingstop', async (event: any) => {
          const coords = event.get('target').geometry.getCoordinates()[0]
          if (!trianglesCheck(coords)) {

          } else {
            edit = await updatePolygonData(id, coords)
            if (!edit) {
              polygon.editor.stopEditing()
            }
          }
        })
      }
    })
  }

  async function updatePolygonData(
    polygonId: string | number,
    coords: any
  ) {

    const polygon = polygons.find(i => i.id === polygonId)

    // Отправляем PUT-запрос с обновленными данными полигона
    await mapService.updatePolygonById(polygonId, polygon, coords)

    setPolygons(polygons.map((p) => (p.id === polygonId ? { ...p, coords: coords } : p)))

    return false
  }

  async function handleOk() {
    if (!polygonData) return

    const updatedPolygonData = {
      ...polygonData,
      name: polygonName
    }

    // Отправляем POST-запрос с обновленными данными полигона
    await mapService.addNewPolygon(updatedPolygonData)

    // Обновляем список полигонов с сервера, добавляя новый полигон
    const newPolygons = [...polygons, updatedPolygonData]

    setPolygons(newPolygons)

    setVisibleModal(false)
    setIsFetching(false)
  }

  /*
  * Функционал для перехода к нужному полигону
  * вынесен на верхний уровень и прокинут к компонентам через пропсы
  * todo внести в Redux
  * */

  const [selectedPolygon, setSelectedPolygon] = useState<number>()
  function handleItemClick(id: number) {
    setSelectedPolygon(id)
  }

  /*
  * функционал для рисования полигонов
  * todo перенести в Redux
  * */

  const [isDrawing, setIsDrawing] = useState(false)

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {load
        ? <Preloader />
        : (
          <MainLayout>
            <SidebarContainer
              sidebarState={sidebarState}
              editPolygonHandler={editPolygonHandler}
              handleItemClick={handleItemClick}
              isDrawing={isDrawing}
              setIsDrawing={setIsDrawing}
            />
            <Modal
              title="Добавить поле"
              open={visibleModal}
              onCancel={handleCancel}
              onOk={handleOk}
            >
              <Input
                placeholder="Введите название"
                value={polygonName}
                onChange={(e) => setPolygonName(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
            </Modal >
            <MapContainer
              className={cn(s.map)}
              center={[54.925946, 82.775931]}
              zoom={13}
            >
              <Map
                selectedPolygon={selectedPolygon}
                isDrawing={isDrawing}
              />
            </MapContainer>
          </MainLayout>
        )}
    </div>
  )
}

export default MainPage
