import { Migration } from '@mikro-orm/migrations';

export class Migration20240211232334 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "weather" ("id" serial primary key, "lat" varchar(255) null, "lon" varchar(255) null, "part" varchar(255) null, "fetched_data" jsonb null);',
    );
  }
}
