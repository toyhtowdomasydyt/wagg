import { Migrator } from '@mikro-orm/migrations';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const MICRO_ORM_CONFIG: MikroOrmModuleSyncOptions = {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  driver: PostgreSqlDriver,
  extensions: [Migrator],
};

export default MICRO_ORM_CONFIG;
