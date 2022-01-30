import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SCREENS_ENUM {
  LOADING = 'loading',
  MAP = 'map',
  PLACE = 'place',
}

const { LOADING } = SCREENS_ENUM;

export interface IScreenState {
  value: SCREENS_ENUM;
}

const initialState: IScreenState = {
  value: LOADING,
};

export const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setScreen: (state, action: PayloadAction<SCREENS_ENUM>) => {
      state.value = action.payload;
    },
  },
});

export const { setScreen } = screenSlice.actions;
