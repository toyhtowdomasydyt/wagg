import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EXCLUDE_PARAMS } from '../constans/openweahter-api.constants';
import { IGetWeatherResponse } from '../interfaces/weather.interface';

@Injectable()
export class GetWetherResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response: Array<IGetWeatherResponse> = [];

        for (const param of EXCLUDE_PARAMS) {
          const list = data?.fetched_data?.[param];

          if (list && Array.isArray(list)) {
            for (const item of list) {
              response.push({
                part: param,
                sunrise: item.sunrise,
                sunset: item.sunset,
                temp: item.day,
                feels_like: item.feels_like.day,
                pressure: item.pressure,
                humidity: item.humidity,
                uvi: item.uvi,
                wind_speed: item.wind_speed,
              });
            }
          }
        }

        return response;
      }),
    );
  }
}
