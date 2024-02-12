import { EntityRepository, wrap } from '@mikro-orm/core';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EXCLUDE_PARAMS } from './constans/openweahter-api.constants';
import { IGetWeather, IStoreWeather } from './interfaces/weather.interface';
import { Weather } from 'src/entities/weather.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class WeatherService {
  private apiKey: string = process.env.OPENWEATHERMAP_API_KEY as string;

  constructor(
    @InjectRepository(Weather)
    private readonly weatherRepository: EntityRepository<Weather>,
  ) {}

  async fetchCurrentWeather({ lat, lon, part }: IStoreWeather) {
    try {
      const url = new URL('https://api.openweathermap.org/data/3.0/onecall');

      if (lat) {
        url.searchParams.append('lat', lat);
      }

      if (lon) {
        url.searchParams.append('lon', lon);
      }

      if (part) {
        const exclude = EXCLUDE_PARAMS.filter((p) => p !== part).join(',');
        url.searchParams.append('exclude', exclude);
      }

      url.searchParams.append('appid', this.apiKey);

      const res = await fetch(url);

      if (res.status !== 200) {
        throw new InternalServerErrorException(await res.json());
      }

      const data = await res.json();

      return data;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed fetchCurrentWeather');
    }
  }

  async fetchAndSave({ lat, lon, part }: IStoreWeather) {
    const weatherData = await this.fetchCurrentWeather({ lat, lon, part });
    await this.weatherRepository.insert({
      lat,
      lon,
      part,
      fetched_data: weatherData,
    });
  }

  async get({ lat, lon, part }: IGetWeather) {
    const weatherData = await this.weatherRepository.findOne({
      lat,
      lon,
      part,
    });

    if (!weatherData) {
      throw new NotFoundException('Weather data not found');
    }

    return wrap(weatherData).serialize();
  }
}
