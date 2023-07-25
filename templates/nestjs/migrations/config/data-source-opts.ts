import * as path from 'path';
import { compileConfigSync } from '@monkee/turbo-config';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { PgConfig } from '../../src/app.config';

const { config } = compileConfigSync(PgConfig, {
  envFiles: ['.env.development', '.env.development.local'],
  topLevelPrefix: 'app.pg',
  loadEnvFiles: process.env.NODE_ENV === 'development',
});

const ormconfig: DataSourceOptions = {
  ...config,
  type: 'postgres',
  entities: [path.resolve(process.cwd(), 'src/**/*.entity{.ts,.js}')],
  migrations: [path.resolve(process.cwd(), 'migrations/*{.ts,.js}')],
};

export default new DataSource(ormconfig);
