import { screenSlice } from './screen';
import { placeSlice } from './place';
import { panelsSlice } from './panels';

export * from './screen';
export const screenReducer = screenSlice.reducer;

export * from './place';
export const placeReducer = placeSlice.reducer;

export * from './panels';
export const panelsReducer = panelsSlice.reducer;
