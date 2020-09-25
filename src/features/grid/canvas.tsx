import React from 'react';
import useCanvas from './canvasHook';

type Props = {
  draw: (context: CanvasRenderingContext2D) => void;
  canvasSize: { width: number, height: number }
}

function resizeCanvasToDisplaySize(context: CanvasRenderingContext2D) {
  const { canvas } = context
  const { width, height } = canvas.getBoundingClientRect()

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    return true;
  }
  return false
}

const predraw = (context: CanvasRenderingContext2D) => {
  context.save()
  resizeCanvasToDisplaySize(context)
  const { width, height } = context.canvas
  context.clearRect(0, 0, width, height)
}

const Canvas: React.FC<Props> = (props) => {

  const { draw, canvasSize } = props
  const canvasRef = useCanvas(draw, predraw)

  return <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
}

export default Canvas
