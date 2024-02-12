import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Weather } from 'src/entities/weather.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Weather])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
