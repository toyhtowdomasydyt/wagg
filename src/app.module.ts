import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MICRO_ORM_CONFIG } from './config/orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(MICRO_ORM_CONFIG), WeatherModule],
})
export class AppModule {}
