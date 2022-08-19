import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {WeatherModel} from './WeatherModel';

const url = 'https://api.openweathermap.org/data/2.5/';

export const weatherApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: url}),
  endpoints: builder => ({
    // getWeather: builder.query<WeatherModel, void>({
    //   query: ({lat, lon}: any) =>
    //     `onecall?lat=${lat}&lon=${lon}&unit=metric&exclude=minutely,daily,alerts&appid=6f63c292bf5c6bcd1b8976b111798f66`,
    // }),
    getWeather: builder.query<WeatherModel, {lat: number; lon: number}>({
      query: arg => {
        const {lat, lon} = arg;
        console.log('arg: ', arg);
        return {
          url: 'onecall?units=metric&exclude=minutely,daily,alerts&appid=6f63c292bf5c6bcd1b8976b111798f66',
          params: {lat, lon},
        };
      },
    }),
  }),
});

export const {useGetWeatherQuery} = weatherApi;
