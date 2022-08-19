export interface WeatherModel {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  hourly: Current[];
}

export interface Current {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  pop?: number;
}

export interface Weather {
  id: number;
  main: Main;
  description: Description;
  icon: Icon;
}

export enum Description {
  BrokenClouds = 'broken clouds',
  OvercastClouds = 'overcast clouds',
  ScatteredClouds = 'scattered clouds',
}

export enum Icon {
  The03D = '03d',
  The04D = '04d',
  The04N = '04n',
}

export enum Main {
  Clouds = 'Clouds',
}
