export const calculateNewCoordinatesByReference = (
  original: { x: number; y: number },
  reference: { x: number; y: number },
  angle: number
) => {
  const deltaX = original.x - reference.x;
  const deltaY = original.y - reference.y;

  const targetX =
    deltaX * Math.cos((angle * Math.PI) / 180) -
    deltaY * Math.sin((angle * Math.PI) / 180) +
    reference.x;
  const targetY =
    deltaY * Math.cos((angle * Math.PI) / 180) +
    deltaX * Math.sin((angle * Math.PI) / 180) +
    reference.y;

  return { x: targetX, y: targetY };
};

export const calculateNewCoordinatesByDistance = (
  original: { x: number; y: number },
  distance: number,
  angle: number
) => {
  const targetX = original.x + distance * Math.cos((angle * Math.PI) / 180);
  const targetY = original.y + distance * Math.sin((angle * Math.PI) / 180);

  return { x: targetX, y: targetY };
};
