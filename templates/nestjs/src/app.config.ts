import { ConfigField, ConfigPrefix } from "@monkee/turbo-config";
import { IsEnum, IsOptional } from "class-validator";

export enum NODE_ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
}

export class PgConfig {
  @ConfigField()
  database!: string;

  @ConfigField()
  schema!: string;

  @ConfigField()
  host!: string;

  @ConfigField()
  port: number = 5432;

  @ConfigField()
  username!: string;

  @ConfigField()
  password!: string;

  @ConfigField()
  runMigrations: boolean = false;

  @ConfigField()
  logTypeOrmQueries: boolean = false;

  @ConfigField()
  createDatabase: boolean = false;
}

export class LoggingConfig {
  @ConfigField()
  prettyMode: boolean = false;

  @ConfigField()
  level: string = "debug";
}

@ConfigPrefix("app")
export class AppConfig {
  @ConfigField()
  port: number = 3000;

  @ConfigField({ envKey: "NODE_ENV" })
  @IsEnum(NODE_ENV)
  env: NODE_ENV = NODE_ENV.PRODUCTION;

  @ConfigField()
  version: string = "local_version";

  @ConfigField()
  @IsOptional()
  corsOrigin?: string;

  @ConfigField({ nested: true, nestedKey: "log" })
  logging!: LoggingConfig;

  @ConfigField({ nested: true })
  pg!: PgConfig;
}
