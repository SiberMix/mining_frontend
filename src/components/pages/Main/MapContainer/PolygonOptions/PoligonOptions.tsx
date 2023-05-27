import { mapService } from '../../../../../api/map'
import { Polygon } from '@pbe/react-yandex-maps'
import React from 'react'

type Props = {
  polygonOptions: any
}

const PolygonOptions:React.FC<Props> = ({ polygonOptions }) => {
  return (
    <>
      {polygonOptions.map(({ id, coords, options }: any) => {

        const polygonGeometry = [coords]
        const polygonProperties = { id }

        const handleMouseEnter = (e: any) => {
          const polygon = e.get('target')
          const id = polygon.properties.get('id')
          const clickCoords = e.get('coords') // получение координат клика

          const data: any = mapService.getPolygonById(id)

          const { name, sequence } = data
          const balloonContent = `<div>Название: ${name}</div><div>Культура: ${sequence}</div>`
          polygon.properties.set('balloonContent', balloonContent)
          polygon.balloon.open(clickCoords, balloonContent) // передача координат клика
        }
        return (
          <Polygon
            key={id}
            geometry={polygonGeometry}
            properties={polygonProperties}
            options={options}
            instanceRef={(polygon) => {
              if (polygon) {
                polygon.events.add('click', handleMouseEnter)
              }
            }}
          />
        )
      })}
    </>
  )
}

export default PolygonOptions
