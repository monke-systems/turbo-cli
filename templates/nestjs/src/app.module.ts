import { TurboConfigModule } from '@monkee/turbo-config';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PrometheusModule,
  makeCounterProvider,
  makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';
import { AppConfig } from './config';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { DATABASE } from './shared/database.enum';
import { MetricsInterceptor } from './shared/interceptors/metrics.interceptor';

@Module({
  imports: [
    TurboConfigModule.forRootAsync(AppConfig, {
      envFiles: ['.env.development', '.env.development.local'],
      loadEnvFiles: process.env.NODE_ENV === 'development',
    }),
    PrometheusModule.register({
      path: '/metrics',
      defaultLabels: {
        appName: 'example-app',
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
          type: 'mariadb',
          host: config.mysql.host,
          port: config.mysql.port,
          username: config.mysql.user,
          password: config.mysql.password,
          database: config.mysql.database,
          logging: config.mysql.logTypeOrmQueries,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
      inject: [AppConfig],
    }),
    HealthcheckModule,
  ],
  providers: [
    makeCounterProvider({
      name: 'http_requests_count',
      help: 'http requests count',
      labelNames: ['endpoint', 'method'],
    }),
    makeHistogramProvider({
      name: 'http_requests_bucket',
      help: 'http requests bucket',
      labelNames: ['endpoint', 'method'],
    }),
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
})
export class AppModule {}
