import {configureStore} from '@reduxjs/toolkit';
import {weatherApi} from './WeatherApi';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});
