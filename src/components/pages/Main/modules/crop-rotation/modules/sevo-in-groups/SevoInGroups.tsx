import React, { useEffect, useRef, useState } from 'react'
import s from './SevoInGroups.module.scss'
import PolygonCanvas from '../../../polygons/PolygonCanvas/PolygonCanvas'
import { getBoundingRect } from '../../../../../../../utils/getBoundingRect'
import { useSelector } from 'react-redux'
import { getAllPolygonsSelector } from '../../../../../../../redux/selectors/mapSelectors'
import { getAllFieldsSelector } from '../../../../../../../redux/selectors/fieldsSelectors'
import Diagram from '../diagram/Diagram'

interface SevoInGroupsProps {
  name?: any,
  id?: any,
  sowing4YearsAgo: any,
  sowing3YearsAgo: any,
  sowing2YearsAgo: any,
  actualSowing: any
}

export const SevoInGroups: React.FC<SevoInGroupsProps> = ({
  name,
  id,
  sowing4YearsAgo,
  sowing3YearsAgo,
  sowing2YearsAgo,
  actualSowing
}) => {
  const previewCanvas = useRef<HTMLCanvasElement>(null)

  const polygons = useSelector(getAllPolygonsSelector)
  const [filterValue, setFilterValue] = useState('')
  const fieldTypes = useSelector(getAllFieldsSelector)
  const [filteredPolygons, setFilteredPolygons] = useState(polygons)

  useEffect(() => {
    const canvas = previewCanvas.current

    if (!canvas) return

    const ctx = canvas?.getContext('2d')
    const draw = (ctx: CanvasRenderingContext2D | null, data: number[][], boundingRect: { x: number, y: number, width: number, height: number }, canvas: HTMLCanvasElement) => {
      const scale = Math.min(canvas.width, canvas.height)
      // Calculate the center of the bounding rectangle
      const centerX = boundingRect.x + boundingRect.width / 2
      const centerY = boundingRect.y + boundingRect.height / 2
      ctx?.beginPath()

      for (const [latitude, longitude] of data) {
        // Subtract half of the canvas dimensions from the coordinates
        const x = ((latitude - centerX) / boundingRect.width) * scale + canvas.width / 2
        const y = ((longitude - centerY) / boundingRect.height) * scale + canvas.height / 2

        ctx?.lineTo(x, y)
      }

      ctx?.fill()
      ctx?.stroke()
    }

    if (ctx) {
      const allPoints = polygons.flatMap(polygon => polygon.coords[0])
      const boundingRect = getBoundingRect(allPoints)

      polygons.forEach((polygon) => {
        const fieldType: any = fieldTypes.find((fieldType: any) => fieldType.name === polygon.sequence)
        const fillStyleColor: string = polygon.sequence.color

        ctx.fillStyle = fillStyleColor

        draw(ctx, polygon.coords[0], boundingRect, canvas)
      })
    }
  }, [fieldTypes, polygons, previewCanvas])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const filtered = polygons.filter((polygon) => {
      return (
        polygon.name
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    })
    setFilteredPolygons(filtered)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <div className={s.table__row}>
          <div className={s.table__item}>
            <div className={s.table__search}>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M19.8024 18.645L14.5481 13.3907C15.875 11.7595 16.5254 9.68142 16.3654 7.58466C16.2053 5.48804 15.2468 3.53287 13.6875 2.12204C12.1284 0.711343 10.0873 -0.0473442 7.9852 0.00229039C5.88306 0.0521361 3.8801 0.906456 2.38938 2.3894C0.9065 3.88017 0.0521618 5.8832 0.00229295 7.98525C-0.0473695 10.0874 0.711293 12.1285 2.12202 13.6876C3.53289 15.2469 5.48805 16.2054 7.58461 16.3655C9.68121 16.5255 11.7593 15.8751 13.3906 14.5482L18.6449 19.8025C18.8564 19.9836 19.145 20.0451 19.4118 19.9663C19.6787 19.8874 19.8874 19.6786 19.9663 19.4118C20.0451 19.145 19.9836 18.8564 19.8025 18.6449L19.8024 18.645ZM3.54692 12.8409C2.3147 11.6094 1.62221 9.93864 1.62183 8.1966C1.62147 6.45437 2.31324 4.78345 3.5449 3.5514C4.77675 2.31935 6.44748 1.62719 8.1897 1.62719C9.93173 1.62719 11.6026 2.31935 12.8343 3.5514C14.0662 4.78345 14.7579 6.45437 14.7576 8.1966C14.7572 9.93864 14.0645 11.6094 12.8323 12.8409C11.6061 14.0817 9.93412 14.7801 8.1897 14.7801C6.44509 14.7801 4.77309 14.0817 3.54692 12.8409Z'
                  fill='white'
                />
              </svg>
              <input
                onChange={handleFilterChange}
                type='text'
              />
            </div>
          </div>
          <div />
          {Array.from({ length: 4 }, (_, i) => {
            const year = new Date().getFullYear() - 3 + i
            return (
              <div
                key={year}
                className={s.table__item}
              >
                <div>
                  {year}
                </div>
              </div>
            )
          })}
        </div>
        <div className={s.table__body}>
          {filteredPolygons.map((item) => (
            <div
              key={item.id}
              className={s.table__row}
            >
              <div
                className={s.table__item}
                key={item.name}
              >
                <PolygonCanvas polygon={item} />
                {item.name}
              </div>
              <div className={s.table__item}>
                {sowing4YearsAgo ? <span style={{ backgroundColor: sowing4YearsAgo && sowing4YearsAgo.color }} /> : null}
                {sowing4YearsAgo ? sowing4YearsAgo.name : null}
              </div>
              <div className={s.table__item}>
                {sowing4YearsAgo ? <span style={{ backgroundColor: sowing3YearsAgo && sowing3YearsAgo.color }} /> : null}
                {sowing3YearsAgo ? sowing3YearsAgo.name : null}
              </div>
              <div className={s.table__item}>
                {sowing4YearsAgo ? <span style={{ backgroundColor: sowing2YearsAgo && sowing2YearsAgo.color }} /> : null}
                {sowing2YearsAgo ? sowing2YearsAgo.name : null}
              </div>
              <div className={s.table__item}>
                {sowing4YearsAgo ? <span style={{ backgroundColor: actualSowing && actualSowing.color }} /> : null}
                {actualSowing ? actualSowing.name : null}
              </div>
            </div>
          ))}
        </div>

      </div>
      <div>
        <div className={s.preview}>
          <canvas
            ref={previewCanvas}
            style={{ transform: 'rotate(-90deg)' }}
          />
        </div>
        <Diagram />
      </div>
    </div>
  )
}
