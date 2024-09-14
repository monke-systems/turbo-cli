import * as path from "node:path";
import { TurboConfigModule } from "@monkee/turbo-config";
import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  PrometheusModule,
  makeCounterProvider,
  makeHistogramProvider,
} from "@willsoto/nestjs-prometheus";
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from "nest-winston";
import * as winston from "winston";
import { AppConfig } from "./app.config";
import { HealthcheckModule } from "./healthcheck/healthcheck.module";
import { DATABASE } from "./shared/database.enum";
import { MetricsInterceptor } from "./shared/interceptors/metrics.interceptor";

@Module({
  imports: [
    TurboConfigModule.forRootAsync([AppConfig], {
      envFiles: [".env.development", ".env.development.local"],
      loadEnvFiles: process.env.NODE_ENV === "development",
    }),
    PrometheusModule.register({
      path: "/metrics",
      defaultLabels: {
        appName: "example-app",
      },
      defaultMetrics: {
        enabled: false,
      },
    }),
    TypeOrmModule.forRootAsync({
      name: DATABASE.MAIN,
      imports: [TurboConfigModule],
      useFactory: (config: AppConfig) => {
        return {
          name: DATABASE.MAIN,
          connectTimeoutMS: 3000,
          retryAttempts: 5,
          type: "postgres",
          ...config.pg,
          logging: config.pg.logTypeOrmQueries,
          migrations: [path.resolve(process.cwd(), "dist/migrations/*.js")],
          autoLoadEntities: true,
          migrationsRun: config.pg.runMigrations,
        };
      },
      inject: [AppConfig],
    }),
    WinstonModule.forRootAsync({
      useFactory: (conf: AppConfig) => ({
        level: conf.logging.level,
        format: conf.logging.prettyMode
          ? winston.format.combine(
              winston.format.ms(),
              nestWinstonModuleUtilities.format.nestLike("", {
                colors: true,
                prettyPrint: true,
              }),
            )
          : winston.format.combine(
              winston.format.errors({ stack: true }),
              winston.format.timestamp({
                format: () => Date.now().toString(),
              }),
              winston.format.json(),
            ),
        transports: [
          new winston.transports.Console({
            level: conf.logging.level,
          }),
        ],
      }),
      inject: [AppConfig],
    }),
    HealthcheckModule,
  ],
  providers: [
    makeCounterProvider({
      name: "http_requests_count",
      help: "http requests count",
      labelNames: ["endpoint", "method"],
    }),
    makeHistogramProvider({
      name: "http_requests_bucket",
      help: "http requests bucket",
      labelNames: ["endpoint", "method"],
    }),
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
})
export class AppModule {}
