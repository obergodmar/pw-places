import {
  configureStore,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { placesApi } from './services';

import logger from 'redux-logger';
import { placeReducer, screenReducer } from './reducers';

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!', {
        title: 'Async error!',
        message: action.error.data.message,
      });
    }

    return next(action);
  };

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    place: placeReducer,
    [placesApi.reducerPath]: placesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      placesApi.middleware,
      logger,
      rtkQueryErrorLogger
    ),
  devTools: process.env['NODE_ENV'] !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
