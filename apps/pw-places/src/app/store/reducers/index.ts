import { screenSlice } from './screen';
import { placeSlice } from './place';

export * from './screen';
export const screenReducer = screenSlice.reducer;

export * from './place';
export const placeReducer = placeSlice.reducer;
