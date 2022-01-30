import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPlaceState {
  id: string;
  name: string;
}

const initialState: IPlaceState = {
  id: '',
  name: '',
};

export const placeSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setPlace: (state, action: PayloadAction<IPlaceState>) => {
      const { id, name } = action.payload;

      Object.assign(state, { id, name });
    },
  },
});

export const { setPlace } = placeSlice.actions;
