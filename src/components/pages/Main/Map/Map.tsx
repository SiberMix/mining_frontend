import s from './Map.module.scss'
// важнейший импорт из самой карты, без него происходит полный пиздец
import 'leaflet/dist/leaflet.css'
// доп файл, убирает флаг и ссылку на leaflet
import './leafletFix.css'
import 'leaflet-draw/dist/leaflet.draw-src.css'
import * as cn from 'classnames'
import React from 'react'
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Popup
} from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import MapViewSelect from './MapViewSelect/MapViewSelect'
import MapPolygons from './MapPolygons/MapPolygons'

type Props = {
  selectedPolygon: number | undefined
}

const Map: React.FC<Props> = ({ selectedPolygon }) => {

  return (
    <MapContainer
      className={cn(s.map)}
      center={[54.925946, 82.775931]}
      zoom={13}
    >

      <MapViewSelect />
      <FeatureGroup>
        <EditControl
          position="topright"
          // onEdited={this._onEditPath}
          // onCreated={this._onCreate}
          // onDeleted={this._onDeleted}
          draw={{
            polygon: true,
            rectangle: false,
            circle: false,
            marker: false,
            polyline: false,
            circlemarker: false
          }}
        />
      </FeatureGroup>
      <MapPolygons selectedPolygon={selectedPolygon} />

      <Marker position={[54.925946, 82.775931]}>
        <Popup>
          A pretty CSS3 popup.
          {' '}
          <br />
          {' '}
          Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default React.memo(Map)
