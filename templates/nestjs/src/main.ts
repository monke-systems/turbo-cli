import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import * as helmet from "helmet";
import {
  WinstonModule,
  WINSTON_MODULE_NEST_PROVIDER,
  utilities as nestWinstonModuleUtilities,
} from "nest-winston";
import * as winston from "winston";
import { AppConfig } from "./app.config";
import { AppModule } from "./app.module";
import { CONTEXT } from "./shared/log-context.enum";

// Logger without external dependencies (e.g config module)
const toplevelLogger = winston.createLogger({
  level: "debug",
  format:
    process.env.APP_LOG_PRETTY_MODE === "true"
      ? winston.format.combine(
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike("", {
            colors: true,
            prettyPrint: true,
          }),
        )
      : winston.format.combine(
          winston.format.errors({ stack: true }),
          winston.format.json(),
        ),
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
  ],
});

async function bootstrap() {
  // disable default logger colors
  process.env.NO_COLOR = "true";

  const app = await NestFactory.create(AppModule, {
    // Provide toplevel logger for bootstrap process
    logger: WinstonModule.createLogger({
      instance: toplevelLogger,
    }),
  });

  const conf = app.get(AppConfig);

  // Replace logger with configured one
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  if (conf.corsOrigin !== undefined) {
    app.enableCors({
      origin: conf.corsOrigin,
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.use(cookieParser());
  app.use(helmet.default());
  app.enableShutdownHooks();

  startSwagger(app, conf);
  await app.listen(conf.port);

  const appUrl = await app.getUrl();

  logger.log("All systems nominal", CONTEXT.BOOTSTRAP);
  logger.log(`App version - ${conf.version}`, CONTEXT.BOOTSTRAP);
  logger.log(`Listening on ${appUrl}`, CONTEXT.BOOTSTRAP);
  logger.log(`Swagger available on ${appUrl}/doc/#`, CONTEXT.BOOTSTRAP);
  logger.log(`Swagger json schema on ${appUrl}/doc-json`, CONTEXT.BOOTSTRAP);
}

function startSwagger(app: INestApplication, conf: AppConfig) {
  const optionsBuilder = new DocumentBuilder()
    .setTitle("Some project")
    .setDescription("API description")
    .setVersion(conf.version);

  const options = optionsBuilder.build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("doc", app, document);
}

process.on("unhandledRejection", (e) => {
  toplevelLogger.error(e);
});

process.on("uncaughtException", (e) => {
  toplevelLogger.error(e);
});

bootstrap().catch((e) => {
  toplevelLogger.error(e);
  process.exit(1);
});
