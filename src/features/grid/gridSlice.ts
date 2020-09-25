/* eslint-disable no-empty-pattern */
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
  },
});

export const { addObjectByXY, setSelectedObjectId } = counterSlice.actions;

export const setObjectsByXY = (x: number, y: number, ...args: any[]): AppThunk => (dispatch) => {
  setTimeout(() => {
    args.forEach((item: {}) => {
      console.log(item);
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
