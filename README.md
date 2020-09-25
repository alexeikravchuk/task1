# task1
Дана сетка 2D с координатами элементов по x,y (Декартова система). На данной сетке есть несколько объектов со своими координатами. Есть некий массив, в котором хранятся все объекты данной сетки.

  - Нужно реализовать хранение этих объектов с возможностью доступа к ним через координаты(например: написать функцию `getObjectsByXY(x, y)`, `setObjectsByXY(x, y, ...args)`).
  - Сделайте минимальную вложенность массива с объектами.
  - Добавите возможность перемещать объекты по сетке, что бы данные актуализировались в массиве(например: функция `updateObjectXY(object, x,y)`)
  - Добавить возможность двигаться объекту вокруг некоторых координат(например функция `setObjectAraund(object, centerX, centerY, radius, angle)`)
  - Добавить возможность переместить объект на некоторое расстояние(например функция `setObjectPositionByDistance(object, distance, angle)`)
  - Реализовать графическое представление данной сетки и объектов с возможностью использования функций выше.

-----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.