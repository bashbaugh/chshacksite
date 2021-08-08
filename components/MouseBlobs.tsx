/** @jsxImportSource theme-ui */
import { memo, useEffect, useRef } from 'react'
import { Box, Container, Flex } from 'theme-ui'
import Navbar from './nav'
import Paper from 'paper'

const GRAVITY = 3
const MAXBLOBS = 1000

const tool = new Paper.Tool()

class Blob {
  path: paper.Path
  spawnTime: number
  splatPointY: number

  constructor(event: paper.ToolEvent) {
    this.path = new Paper.Path.Circle({
      center: event.middlePoint,
      radius: Math.floor(Math.random() * 10) + 3,
      fillColor: {
        hue: event.count * 3,
        saturation: 1,
        brightness: 1
      } as any
    })

    this.spawnTime = new Date().getTime()
    this.splatPointY = window.innerHeight - Math.floor(Math.random() * 80)
  }

  update(delta: number) {
    if (this.path.position.y < this.splatPointY)
      this.path.position.y +=
        GRAVITY * ((new Date().getTime() - this.spawnTime) / 1000) ** 2
  }
}

function draw() {
  const blobs: Blob[] = []

  tool.onMouseMove = (e: paper.ToolEvent) => {
    blobs.push(new Blob(e))
  }

  Paper.view.onFrame = e => {
    for (const blob of blobs) blob.update(e.delta)

    if (blobs.length > MAXBLOBS) {
      blobs[0].path.remove()
      blobs.shift()
    }
  }
}

const MouseBlobs: React.FC = props => {
  const ref = useRef()

  useEffect(() => {
    Paper.setup(ref.current)

    draw()

    // TODO listener cleanup
    return () => {
      Paper.view.remove()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      {...props}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  )
}

export default memo(MouseBlobs)
