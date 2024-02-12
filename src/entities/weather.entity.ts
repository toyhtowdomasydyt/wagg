import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Weather {
  @PrimaryKey()
  id: number;

  @Property({ nullable: true })
  lat?: string;

  @Property({ nullable: true })
  lon?: string;

  @Property({ nullable: true })
  part?: string;

  @Property({ type: 'json', nullable: true })
  fetched_data?: object;
}
