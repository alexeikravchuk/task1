import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

export interface IObject {
  id: number;
  posX: number;
  posY: number;
  name: string;
  color: string;
}

interface IObjectState {
  selected: number;
  objects: IObject[];
}

const defaultObject = {
  id: 0,
  posX: 0,
  posY: 0,
  name: 'dot',
  color: 'black',
};

const initialState: IObjectState = {
  selected: 1,
  objects: [
    {
      id: 1,
      posX: 0,
      posY: 10,
      name: 'dot1',
      color: '#f00',
    },
    {
      id: 2,
      posX: -20,
      posY: -10,
      name: 'dot2',
      color: 'blue',
    },
    {
      id: 3,
      posX: 10,
      posY: -15,
      name: 'dot3',
      color: 'green',
    },
    {
      id: 4,
      posX: -10,
      posY: 5,
      name: 'dot3',
      color: 'magenta',
    },
    {
      id: 5,
      posX: 20,
      posY: 20,
      name: 'dot3',
      color: 'brown',
    },
    {
      id: 6,
      posX: 15,
      posY: 0,
      name: 'dot3',
      color: 'yellow',
    },
  ],
};

export const counterSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    addObjectByXY(state, action: PayloadAction<IObject>) {
      state.objects.push(action.payload);
    },
    setSelectedObjectId(state, action: PayloadAction<number>) {
      state.selected = action.payload;
    },
    setCoordinates(state, action: PayloadAction<{ posX: number; posY: number }>) {
      const selectedIndex = state.objects.findIndex((item: IObject) => item.id === state.selected);
      const currentObject = state.objects[selectedIndex];
      state.objects[selectedIndex] = { ...currentObject, ...action.payload };
    },
    changeCoordinate(state, action: PayloadAction<{ value: number; coordinateName: string }>) {
      const selectedIndex = state.objects.findIndex((item: IObject) => item.id === state.selected);
      const currentObject = state.objects[selectedIndex];
      state.objects[selectedIndex] = {
        ...currentObject,
        [action.payload.coordinateName]: action.payload.value,
      };
    },
  },
});

export const {
  addObjectByXY,
  setSelectedObjectId,
  changeCoordinate,
  setCoordinates,
} = counterSlice.actions;

export const setObjectsByXY = (x: number, y: number, ...args: any[]): AppThunk => (dispatch) => {
  setTimeout(() => {
    args.forEach((item: {}) => {
      if (item.hasOwnProperty('name')) {
        dispatch(
          addObjectByXY({
            ...defaultObject,
            posX: x,
            posY: y,
            ...item,
          })
        );
      }
    });
  });
};

export const selectObjects = (state: RootState) => state.grid.objects;
export const selectedItemId = (state: RootState) => state.grid.selected;

export default counterSlice.reducer;
