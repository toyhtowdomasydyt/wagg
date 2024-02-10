import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Weather {
  @PrimaryKey()
  id: number;
}
