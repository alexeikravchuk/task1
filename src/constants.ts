/*=============== grid values ===============*/
export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 500;
export const GRID_STEP = 10;
export const UNITS_STEP = 10;
export const GRID_COLOR = '#aaa';
export const GRID_AXIS_COROR = '#000';
export const GRID_FONT = 'normal 16px Arial';
export const GRID_FONT_COLOR = '#004';
export const ACTIVE_OBJECT_STROKE_COLOR = '#779';
export const ACTIVE_OBJECT_RADIUS = GRID_STEP / 1.5;
export const ACTIVE_OBJECT_STROKE_WIDTH = 3;
export const DEFAULT_LINE_WIDTH = 1;
export const DEFAULT_OBJECT_RADIUS = GRID_STEP / 2;

export const MOVE_SPEED = 0.5;
export const ROTATE_SPEED = 2;

/*=============== titles ===============*/
export const TITLE = '2D сетка с координатами объектов по x, y. (Декартовая система)';

export const FOOTER_LINKS = {
  code: {
    link: 'https://github.com/alexeikravchuk/task1',
    title: 'Исходный код',
  },
  projects: {
    link: 'https://alexeikravchuk.github.io/rsschool-cv/#projects',
    title: 'Выполненные работы',
  },
};

/*=============== fields ===============*/
export const POSITION = 'Координаты';
export const DISTANCE = 'расстояние';
export const MOVE = 'Переместить';
export const MOVE_BY_COORDINATES = `${MOVE} объект по координатам`;
export const MOVE_AROUNT_REFERENCE = `${MOVE} объект вокруг координаты`;
export const MOVE_DISTANCE = `${MOVE} объект на ${DISTANCE}`;
export const ANGLE = 'угол';
export const ADD_OBJECT = 'Добавить объект';
export const SAVE = 'Сохранить';
export const CANCEL = 'Отменить';
export const OBJECT_COORDINATES = `${POSITION} объекта`;
export const COORDINATES_MIN_VALUE = -30;
export const COORDINATES_MAX_VALUE = 30;
export const ROTATE_ANGLE_MIN_VALUE = -3600;
export const ROTATE_ANGLE_MAX_VALUE = 3600;
export const OK_TEXT = 'Да';
export const CANCEL_TEXT = 'Нет';

export const COLORS: { [key: string]: string } = {
  black: 'Черный',
  '#de2': 'Желтый',
  red: 'Красный',
  blue: 'Синий',
  magenta: 'Розовый',
  green: 'Зеленый',
  gray: 'Серый',
  brown: 'Коричневый',
  violet: 'Фиолетовый',
};

/*=============== messages ===============*/
export const SELECT_OBJECT_MSG = 'Выберите объект из списка';
export const OBJECT_CREATED_MSG = 'Объект успешно создан';
export const SURE_DELETE_MSG = 'Удалить объект?';
