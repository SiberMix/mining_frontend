import React, { useState } from 'react';
import { LayersControl, TileLayer, useMap, useMapEvents } from 'react-leaflet';

import { setZoomLevel } from '~processes/redux/slices/mapSlice';
import { useAppDispatch } from '~processes/redux/store';
import { settingsStore } from '~widgets/settings';

import { mapLayers } from '../const';
import { toast } from 'react-toastify';

export const MapViewSelect = () => {
  const dispatch = useAppDispatch();
  const map = useMap();

  const [ndviMode, setNdviMode] = useState(false);
  const [loading, setLoading] = useState(false); // состояние загрузки

  useMapEvents({
    zoom: () => {
      dispatch(setZoomLevel(map.getZoom()));
    },
    click: (e) => {
      if (!ndviMode) return;

      const { lat, lng } = e.latlng;
      console.log('Клик для NDVI на координатах:', lat, lng);

      setLoading(true); // включаем спиннер
      fetchNdviImages(lat, lng)
        .then((images) => {
          if (images.length === 0) {
            alert('NDVI снимки не найдены');
            setNdviMode(false);
            return;
          }
          // Скачиваем первый файл из массива
          downloadFile(images[0]);
          setNdviMode(false);
        })
        .catch(() => {
          alert('Ошибка при получении NDVI снимка');
          setNdviMode(false);
        })
        .finally(() => {
          setLoading(false); // выключаем спиннер
        });
    },
  });

  const baseMapType = settingsStore((state) => state.settings.baseMapType);
  const baseLayer =
    mapLayers.find((layer) => layer.name === baseMapType) || mapLayers[0];

  const trafficUrl =
    'https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?key=qO6RgWhGEmHHbZi1m5sxs8oBts4YOitp';

  async function fetchNdviImages(lat: number, lng: number): Promise<string[]> {
    const response = await fetch(
      'http://localhost:8000/api/v1/playbacks/ndvi/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coordinates: [{ lat, lng }] }),
      },
    );

    if (!response.ok) throw new Error('Ошибка при получении NDVI снимка');
    const data = await response.json();

    return Array.isArray(data.results)
      ? data.results.map((item: any) => item.url).filter(Boolean)
      : [];
  }

  function downloadFile(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'ndvi.tiff';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <LayersControl position='topright' collapsed={true}>
        {mapLayers.map((layer) => (
          <LayersControl.BaseLayer
            key={layer.name}
            name={layer.name}
            checked={baseMapType === layer.name}
          >
            <TileLayer
              url={layer.url}
              subdomains={layer.subdomains || undefined}
              zIndex={100}
            />
          </LayersControl.BaseLayer>
        ))}
        <LayersControl.Overlay name='Пробки' checked={false}>
          <TileLayer
            url={trafficUrl}
            opacity={0.6}
            attribution='© TomTom'
            zIndex={500}
          />
        </LayersControl.Overlay>
      </LayersControl>

      {/* Кнопка для включения режима NDVI */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 13,
          background: 'white',
          width: 43,
          height: 43,
          borderRadius: 4,
          boxShadow: '0 0 5px rgba(0,0,0,0.3)',
          zIndex: 1000,
          userSelect: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: ndviMode ? 'default' : 'pointer',
          color: ndviMode ? 'gray' : 'black',
          border: ndviMode ? '2px solid gray' : '2px solid transparent',
        }}
        onClick={() => {
          if (!ndviMode) {
            setNdviMode(true);
            toast.info('Кликните на участок карты для получения снимка');
          }
        }}
        title={ndviMode ? 'Кликните на карту...' : 'Включить режим NDVI'}
      >
        📷
      </div>

      {/* Спиннер загрузки по центру карты */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2000,
            background: 'rgba(255, 255, 255, 0.8)',
            padding: 20,
            borderRadius: 8,
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              border: '4px solid #ccc',
              borderTop: '4px solid #333',
              borderRadius: '50%',
              width: 30,
              height: 30,
              animation: 'spin 1s linear infinite',
            }}
          />
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}
    </>
  );
};
