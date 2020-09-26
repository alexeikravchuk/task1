import React from 'react';
import { useSelector } from 'react-redux';
import { selectedItemId, selectObjects } from './gridSlice';
import Canvas from './canvas';
import { drawAxis, drawGrid, drawPoints } from './helpers';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants';

export function Grid() {
  const objects = useSelector(selectObjects);
  const selectedItem = useSelector(selectedItemId);

  const canvasSize = { width: CANVAS_WIDTH, height: CANVAS_HEIGHT };

  const draw = (context: CanvasRenderingContext2D) => {
    drawGrid(context);
    drawAxis(context);
    drawPoints(context, objects, selectedItem);
  }

  return (
    <div className="grid-container">
      <Canvas draw={draw} canvasSize={canvasSize} />
    </div>
  );
}
