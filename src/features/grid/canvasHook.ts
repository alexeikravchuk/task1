import { useRef, useEffect } from 'react';

const useCanvas = (
  draw: (context: CanvasRenderingContext2D) => void,
  predraw: (context: CanvasRenderingContext2D) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    const render = () => {
      if (context) {
        predraw(context);
        draw(context);
      }
    };

    render();
  }, [draw, predraw]);

  return canvasRef;
};

export default useCanvas;
