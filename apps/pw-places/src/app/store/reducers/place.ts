import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPlaceState {
  id: string;
  name: string;
  assetsReady: boolean;
}

const initialState: IPlaceState = {
  id: '',
  name: '',
  assetsReady: false,
};

export const placeSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setPlace: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;

      Object.assign(state, { id, name });
    },

    setAssetsReady: (state) => {
      state.assetsReady = true;
    },

    dropAssets: () => initialState,
  },
});

export const { setPlace, setAssetsReady, dropAssets } = placeSlice.actions;
