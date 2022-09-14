import { compileConfigSync, ConfigField } from '@monkee/turbo-config';
import type { ConnectionOptions } from 'typeorm';
import { MysqlConfig } from '../src/config';

class MainMyslConfig {
  @ConfigField({ nested: true })
  mysql!: MysqlConfig;
}

const { config } = compileConfigSync(MainMyslConfig, {
  envFiles: ['.env.development', '.env.development.local'],
  loadEnvFiles: process.env.NODE_ENV === 'development',
});

const ormconfig: ConnectionOptions = {
  ...config.mysql,
  username: config.mysql.user,
  type: 'mariadb',
  cli: {
    migrationsDir: 'migrations',
  },
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
};

export = ormconfig;
