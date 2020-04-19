import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as config from 'config'

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serverConfig = config.get('server')
  const port = process.env.PORT || serverConfig.port;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  await app.listen(port);

  logger.log(`🚀 Application listening on port: ${port}`);
}

bootstrap();
