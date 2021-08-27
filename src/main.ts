import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

// Winston & Morgan
import { logger, stream } from './utils/winston.util';
import * as morgan from 'morgan';

// Config
import { configuration } from '@configs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logger,
  });

  app.use(morgan('combined', { stream }));

  await app.listen(configuration().port);
}

bootstrap();
