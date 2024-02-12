export interface IStoreWeather {
  lat?: string;
  lon?: string;
  part?: string;
}

export interface IGetWeather {
  lat: string;
  lon: string;
  part: string;
}

export interface IGetWeatherResponse {
  part: string;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  uvi: number;
  wind_speed: number;
}
