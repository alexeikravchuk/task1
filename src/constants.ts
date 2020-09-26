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

// fields
export const POSITION = 'Координаты';
export const DISTANCE = 'расстояние';
export const MOVE = 'Переместить';
export const MOVE_DISTANCE = `${MOVE} объект на ${DISTANCE}`;
export const ANGLE = 'угол';
export const ADD_OBJECT = 'Добавить объект';
export const SAVE = 'Сохранить';
export const CANCEL = 'Отменить';

export const COLORS: { [key: string]: string } = {
  black: 'Черный',
  '#de4': 'Желтый',
  red: 'Красный',
  blue: 'Синий',
  magenta: 'Розовый',
  green: 'Зеленый',
  gray: 'Серый',
  brown: 'Коричневый',
  violet: 'Фиолетовый',
};

// messages
export const SELECT_OBJECT_MSG = 'Выберите объект из списка';
export const OBJECT_CREATED_MSG = 'Объект успешно создан';
export const SURE_DELETE_MSG = 'Удалить объект?';
