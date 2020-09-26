import React from 'react';
import { useSelector } from 'react-redux';
import { selectedItemId, selectObjects } from './gridSlice';
import Canvas from './canvas';
import { drawAxis, drawGrid, drawPoints } from './helpers';

export function Grid() {
  const objects = useSelector(selectObjects);
  const selectedItem = useSelector(selectedItemId);

  const canvasSize = { width: 600, height: 500 };

  const draw = (context: CanvasRenderingContext2D) => {
    drawGrid(context);
    drawAxis(context);
    drawPoints(context, objects, selectedItem);
  }

  return (
    <div>
      <Canvas draw={draw} canvasSize={canvasSize} />
    </div>
  );
}
