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
  Map,
  Polygon,
  TypeSelector,
  YMaps,
  ZoomControl
} from '@pbe/react-yandex-maps'

import {
  atom,
  useAtom,
  useAtomValue,
  useSetAtom
} from 'jotai'
import styled from 'styled-components'
import MainLayout from './MainLayout/MainLayout'
import type { Polygon as PolygonType } from '../../../types'

import { SidebarStateAtom } from './Sidebar/Sidebar'
import type { Equip } from '../../../types/equip'

import './styles.css'
import { mapService } from '../../../api/map'
import Preloader from '../../common/preloader/Preloader'
import SidebarContainer from './Sidebar/SidebarContainer'
import PolygonOptions from './MapContainer/PolygonOptions/PoligonOptions'
import EquipmentList from './MapContainer/EquipmentList/EquipmentList'

export const polygonsAtom = atom<PolygonType[]>([])
export const Equipments = atom<Equip[]>([])
export const isDrawingAtom = atom(false)
export const isFetchingAtom = atom(false)
export const fieldTypesAtom = atom([])

interface PolygonOptions {
  id: string,
  coords: [number, number][],
  color: string,
  options: {
    fillColor: string,
    fillOpacity: number,
    strokeColor: string,
    strokeWidth: number,
    opacity: number
  }
}

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

  const isDrawing = useAtomValue(isDrawingAtom)
  const setIsFetching = useSetAtom(isFetchingAtom)
  const [polygonData, setPolygonData] = useState<PolygonType | null>(null)
  const [sidebarState, setSidebarState] = useAtom<any>(SidebarStateAtom)

  const [polygonName, setPolygonName] = useState('')
  const [polygonOptions, setPolygonOptions] = useState<PolygonOptions[]>([])
  const [equipmentList, setEquipmentList] = useState<Equip[]>([])

  useEffect(() => {
    // Получаем список оборудования с имей через API
    mapService.getEquips().then(data => setEquipmentList(data.data))
  }, [])

  useEffect(() => {
    const updatedOptions = polygons.map(({ coords, id, sequence }) => {

      const fieldType: any = fieldTypes.find((fieldType: any) => fieldType.name === sequence)
      const color = fieldType ? fieldType.color : '#6c86ff'
      return {
        id,
        coords,
        color,
        options: {
          fillColor: color,
          fillOpacity: 0.63,
          strokeColor: '#fff',
          strokeWidth: 1,
          opacity: 0.6
        }
      }
    })
    // @ts-ignore
    Promise.all(updatedOptions).then((options) => setPolygonOptions(options))
  }, [polygons])

  const [visibleModal, setVisibleModal] = useState(false)

  useEffect(() => {
    ((async () => {
      const fieldTypes = await mapService.getFieldList()
      setFieldTypes(fieldTypes.data)
      const polygons = await mapService.getPolygons()
      setPolygons(polygons.data)
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

  const draw = (ref: any) => {
    if (!isDrawing) {
      ref.editor.stopDrawing()
      return
    }

    ref.editor.startDrawing()

    ref.editor.events.add('drawingstop', addPolygon)
  }

  const highlightPolygonById = (id: string | number, highlightColor: string) => {

    const updatePolygonColorById = (id: string | number, newColor: string) => {
      setPolygonOptions(polygonOptions.map((item: any) => {
        if (item.id === id) {
          return { ...item, color: newColor, options: { ...item.options, fillColor: newColor } }
        }
        return item

      }))
    }

    updatePolygonColorById(id, highlightColor)
    setTimeout(() => {
      // @ts-ignore
      updatePolygonColorById(id, polygonOptions.find((item) => item.id === id).color)
    }, 300) // время задержки в миллисекундах
  }

  const polygonClickHandler = (id: string | number) => {

    const middleCoords = polygons.find((p) => p.id === id)?.middle_coord

    ref.current?.setCenter(middleCoords, 14)

    highlightPolygonById(id, '#ffffff')
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

    const temp = JSON.stringify({ ...polygon,
      sequence: coords })

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

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {load ? <Preloader /> : (
        <MainLayout>
          <SidebarContainer
            sidebarState={sidebarState}
            editPolygonHandler={editPolygonHandler}
            polygonClickHandler={polygonClickHandler}
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
          </Modal>
          <MapContainer>
            <YMaps
              query={{
                apikey: '501b839a-c713-4555-aa78-047240c8d224',
                lang: 'ru_RU',
                mode: 'release'
              }}
            >
              <Map
                instanceRef={ref}
                // width={
                //   sidebarState.isPolygonListOpen ? '70vw' :
                //     sidebarState.isReferenceListOpen ? '83vw' :
                //       sidebarState.isCalendarOpen ? '83vw' :
                //         '97.8vw'
                // }
                width={sidebarState.isPolygonListOpen ? '70vw' : '97.8vw'}
                //@ts-ignore
                width={sidebarState.isReferenceListOpen ? '83vw' : '97.8vw'}
                width={sidebarState.isCalendarOpen ? '83vw' : '97.8vw'}
                options={{ suppressMapOpenBlock: true }}
                height="100vh"
                defaultState={{
                  center: [54.925946, 82.775931],
                  zoom: 15,
                  type: 'yandex#satellite'
                }}
                modules={['geoObject.addon.editor', 'geoObject.addon.balloon', 'geoObject.addon.hint']}

              >
                <ZoomControl
                  options={{ size: 'small', position: { top: 10, right: 10 } }}
                />
                <TypeSelector
                  //@ts-ignore
                  options={{ position: { top: 10, right: 50 } }}
                  //@ts-ignore
                  defaultState={{ expanded: false }}
                />
                <PolygonOptions polygonOptions={polygonOptions} />
                <div>
                  <div>
                    <EquipmentList equipmentList={equipmentList} />
                  </div>
                </div>
                <Polygon
                  instanceRef={(ref) => ref && draw(ref)}
                  geometry={[]}
                  options={{
                    cursor: 'crosshair',
                    fillColor: '#28b6fe',
                    fillOpacity: 0.4,
                    // Цвет обводки.
                    strokeColor: '#28b6fe',
                    fillImageHref: '/src/assets/icons/lines.png',
                    // Тип заливки фоном.
                    fillMethod: 'tile',
                    // Убираем видимость обводки.
                    // Ширина обводки.
                    strokeWidth: 1
                  }}
                />
              </Map>
            </YMaps>
          </MapContainer>
        </MainLayout>
      )}
    </div>
  )
}

export default MainPage

const MapContainer = styled.div`
  width: 100%;
`
