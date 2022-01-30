import { RootState } from '../index';

export const screenSelector = (state: RootState) => state.screen;

export const placeSelector = (state: RootState) => state.place;
