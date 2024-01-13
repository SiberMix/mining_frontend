import './StickPreloader.scss'
import React, { useEffect } from 'react'

const StickPreloader = () => {
  useEffect(() => {
    const points: any = []
    const velocity2 = 5
    const canvas: any = document.getElementById('container')
    const context = canvas.getContext('2d')
    const radius = 5
    const boundaryX = 400
    const boundaryY = 400
    const numberOfPoints = 50

    init()

    function init() {
      // create points
      for (let i = 0; i < numberOfPoints; i++) {
        createPoint()
      }
      // create connections
      for (let i = 0, l = points.length; i < l; i++) {
        const point = points[i]
        if (i === 0) {
          points[i].buddy = points[points.length - 1]
        } else {
          points[i].buddy = points[i - 1]
        }
      }
      // animate
      animate()
    }

    function createPoint() {
      const point: any = {}
      point.x = Math.random() * boundaryX
      point.y = Math.random() * boundaryY
      // random vx
      point.vx = (Math.random() * 2 - 1) * Math.random()
      const vx2 = Math.pow(point.vx, 2)
      // vy^2 = velocity^2 - vx^2
      const vy2 = velocity2 - vx2
      point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1)
      points.push(point)
    }

    function resetVelocity(point: any, axis: any, dir: any) {
      let vx2
      let vy2
      if (axis === 'x') {
        point.vx = dir * Math.random()
        vx2 = Math.pow(point.vx, 2)
        // vy^2 = velocity^2 - vx^2
        vy2 = velocity2 - vx2
        point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1)
      } else {
        point.vy = dir * Math.random()
        vy2 = Math.pow(point.vy, 2)
        // vy^2 = velocity^2 - vx^2
        vx2 = velocity2 - vy2
        point.vx = Math.sqrt(vx2) * (Math.random() * 2 - 1)
      }
    }

    function drawCircle(x: any, y: any) {
      context.beginPath()
      context.arc(x, y, radius, 0, 2 * Math.PI, false)
      context.fillStyle = '#AACE67'
      context.fill()
    }

    function drawLine(x1: any, y1: any, x2: any, y2: any) {
      context.beginPath()
      context.moveTo(x1, y1)
      context.lineTo(x2, y2)
      context.strokeStyle = '#AACE67'
      context.stroke()
    }

    function draw() {
      for (let i = 0, l = points.length; i < l; i++) {
        // circles
        const point = points[i]
        point.x += point.vx
        point.y += point.vy
        drawCircle(point.x, point.y)
        // lines
        drawLine(point.x, point.y, point.buddy.x, point.buddy.y)
        // check for edge
        if (point.x < 0 + radius) {
          resetVelocity(point, 'x', 1)
        } else if (point.x > boundaryX - radius) {
          resetVelocity(point, 'x', -1)
        } else if (point.y < 0 + radius) {
          resetVelocity(point, 'y', 1)
        } else if (point.y > boundaryY - radius) {
          resetVelocity(point, 'y', -1)
        }
      }
    }

    function animate() {
      context.clearRect(0, 0, boundaryX, boundaryY)
      draw()
      requestAnimationFrame(animate)
    }
  }, [])

  return (
    <div className="preloader">
      <canvas
        id="container"
        width="400"
        height="400"
        style={{
          width: '400px',
          height: '400px'
          // transform: 'rotate(45deg)'
        }}
      />
      <span>
        Loading...
      </span>
    </div>

  )
}

export default StickPreloader
