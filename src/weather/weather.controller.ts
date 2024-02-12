import { TypedBody, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { IGetWeather, IStoreWeather } from './interfaces/weather.interface';
import { WeatherService } from './weather.service';
import { GetWetherResponseInterceptor } from './interceptors/response.interceptor';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @TypedRoute.Post()
  async save(@TypedBody() weatherParams: IStoreWeather) {
    await this.weatherService.fetchAndSave(weatherParams);
  }

  @UseInterceptors(GetWetherResponseInterceptor)
  @Get('/')
  async get(@TypedQuery() weatherParams: IGetWeather) {
    return this.weatherService.get(weatherParams);
  }
}
