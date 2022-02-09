import {
  configureStore,
  createAction,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { placesApi } from './services';

import logger from 'redux-logger';
import {
  dropAssets,
  panelsReducer,
  placeReducer,
  screenReducer,
  SCREENS_ENUM,
  setScreen,
} from './reducers';
import { AnyAction } from 'redux';
import { batch } from 'react-redux';

enum ItemsActionsTypes {
  APPLY_ITEM_ACTION = 'APPLY_ITEM_ACTION',
}

const { APPLY_ITEM_ACTION } = ItemsActionsTypes;

export const applyItemAction = createAction<string, ItemsActionsTypes>(
  APPLY_ITEM_ACTION
);

const ItemsAction: { [key: string]: () => AnyAction } = {
  runaPerenosa: () => setScreen(SCREENS_ENUM.MAP),
};

const rtkQueryErrorLogger: Middleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!', {
      title: 'Async error!',
      message: action.error.data.message,
    });
  }

  return next(action);
};

const itemsActionsMiddleware: Middleware = (api) => (dispatch) => (action) => {
  const { type, payload } = action;

  batch(() => {
    if (type === APPLY_ITEM_ACTION) {
      dispatch(ItemsAction[payload]());
      dispatch(dropAssets());
    }

    dispatch(action);
  });
};

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    place: placeReducer,
    panels: panelsReducer,
    [placesApi.reducerPath]: placesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      placesApi.middleware,
      logger,
      rtkQueryErrorLogger,
      itemsActionsMiddleware
    ),
  devTools: process.env['NODE_ENV'] !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
