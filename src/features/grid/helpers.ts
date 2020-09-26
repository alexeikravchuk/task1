import { IObject } from './gridSlice';

const STEP = 10;

export const drawGrid = (context: CanvasRenderingContext2D) => {
  const { width, height } = context.canvas.getBoundingClientRect();
  if (context) {
    context.beginPath();
    for (var x = -0.1; x < width; x += STEP) {
      context.moveTo(x, 0);
      context.lineTo(x, width);
    }

    for (var y = -0.1; y < height; y += STEP) {
      context.moveTo(0, y);
      context.lineTo(width, y);
    }

    context.strokeStyle = '#aaa';
    context.lineWidth = 1;
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
    context.lineTo(width - STEP * 1.8, height / 2 - STEP);
    context.moveTo(width - STEP * 1.8, height / 2 + STEP);
    context.lineTo(width, height / 2);

    context.moveTo(width / 2, height);
    context.lineTo(width / 2, 0);
    context.lineTo(width / 2 - STEP, STEP * 1.8);
    context.moveTo(width / 2 + STEP, STEP * 1.8);
    context.lineTo(width / 2, 0);

    context.strokeStyle = '#000';
    context.stroke();
    context.closePath();

    context.font = 'normal 16px Arial';
    context.fillText('0', width / 2 - STEP * 1.5, height / 2 + STEP * 1.5);
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
      const posX = zeroX + item.posX * 10;
      const posY = zeroY - item.posY * 10;
      if (item.id !== selectedItem) {
        context.lineWidth = 1;
        context.arc(posX, posY, STEP / 2, 0, Math.PI * 2, false);
        context.fillStyle = item.color;
        context.fill();
        context.fillStyle = '#000';
        context.fillText(`${item.id}`, posX + STEP / 2, posY - STEP / 2);
        context.closePath();
      } else {
        context.arc(posX, posY, STEP / 1.5, 0, Math.PI * 2, false);
        context.fillStyle = item.color;
        context.strokeStyle = '#779';
        context.fill();
        context.lineWidth = 3;
        context.stroke();
        context.fillStyle = '#000';
        context.fillText(`${item.id}`, posX + STEP / 2, posY - STEP / 2);
        context.closePath();
      }
    });
  }
};
