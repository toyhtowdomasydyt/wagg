import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { IWeatherParams } from './interfaces/weather.interface';

@Controller('weather')
export class WeatherController {
  @TypedRoute.Post()
  async save(@TypedBody() weatherParams: IWeatherParams) {
    console.log(weatherParams);
  }
}
