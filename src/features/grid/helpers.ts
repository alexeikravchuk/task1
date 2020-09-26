import {
  ACTIVE_OBJECT_RADIUS,
  ACTIVE_OBJECT_STROKE_COLOR,
  ACTIVE_OBJECT_STROKE_WIDTH,
  DEFAULT_LINE_WIDTH,
  DEFAULT_OBJECT_RADIUS,
  GRID_AXIS_COROR,
  GRID_COLOR,
  GRID_FONT,
  GRID_FONT_COLOR,
  GRID_STEP,
  UNITS_STEP,
} from '../../constants';
import { IObject } from './gridSlice';

export const drawGrid = (context: CanvasRenderingContext2D) => {
  const { width, height } = context.canvas.getBoundingClientRect();
  if (context) {
    context.beginPath();
    for (var x = -0.1; x < width; x += GRID_STEP) {
      context.moveTo(x, 0);
      context.lineTo(x, width);
    }

    for (var y = -0.1; y < height; y += GRID_STEP) {
      context.moveTo(0, y);
      context.lineTo(width, y);
    }

    context.strokeStyle = GRID_COLOR;
    context.lineWidth = DEFAULT_LINE_WIDTH;
    context.stroke();
    context.closePath();
  }
};

export const drawAxis = (context: CanvasRenderingContext2D) => {
  const { width, height } = context.canvas.getBoundingClientRect();
  if (context) {
    context.beginPath();
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.lineTo(width - GRID_STEP * 1.8, height / 2 - GRID_STEP);
    context.moveTo(width - GRID_STEP * 1.8, height / 2 + GRID_STEP);
    context.lineTo(width, height / 2);

    context.moveTo(width / 2, height);
    context.lineTo(width / 2, 0);
    context.lineTo(width / 2 - GRID_STEP, GRID_STEP * 1.8);
    context.moveTo(width / 2 + GRID_STEP, GRID_STEP * 1.8);
    context.lineTo(width / 2, 0);

    context.strokeStyle = GRID_AXIS_COROR;
    context.stroke();
    context.closePath();

    context.fillStyle = GRID_FONT_COLOR;
    context.font = GRID_FONT;
    context.fillText('0', width / 2 - GRID_STEP * 1.5, height / 2 + GRID_STEP * 1.5);
    context.fillText('x', width - GRID_STEP * 2, height / 2 + GRID_STEP * 2.5);
    context.fillText('y', width / 2 - GRID_STEP * 2, GRID_STEP * 2);

    context.fillText('0°', width - GRID_STEP * 2, height / 2 - GRID_STEP * 2);
    context.fillText('90°', width / 2 + GRID_STEP * 2, GRID_STEP * 2);
    context.fillText('180°', GRID_STEP, height / 2 - GRID_STEP * 1.5); 
    context.fillText('270°', width / 2 + GRID_STEP, height - GRID_STEP); 
  }
};

export const drawPoints = (
  context: CanvasRenderingContext2D,
  objects: IObject[],
  selectedItem: number
) => {
  const { width, height } = context.canvas.getBoundingClientRect();
  const zeroX = width / 2;
  const zeroY = height / 2;

  if (context) {
    objects.forEach((item) => {
      context.beginPath();
      const posX = zeroX + item.posX * UNITS_STEP;
      const posY = zeroY - item.posY * UNITS_STEP;

      if (item.id !== selectedItem) {
        context.arc(posX, posY, DEFAULT_OBJECT_RADIUS, 0, Math.PI * 2, false);
        context.fillStyle = item.color;
        context.fill();
      } else {
        context.arc(posX, posY, ACTIVE_OBJECT_RADIUS, 0, Math.PI * 2, false);
        context.fillStyle = item.color;
        context.fill();

        context.lineWidth = ACTIVE_OBJECT_STROKE_WIDTH;
        context.strokeStyle = ACTIVE_OBJECT_STROKE_COLOR;
        context.stroke();
      }
      context.fillStyle = GRID_FONT_COLOR;
      context.fillText(`${item.id}`, posX + GRID_STEP / 2, posY - GRID_STEP / 2);
      context.closePath();
    });
  }
};
