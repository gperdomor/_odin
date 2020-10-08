import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { configure } from './configure';
import { HOST, SERVICE_NAME } from './constants';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  const port = configure(app);

  // await app.startAllMicroservicesAsync();
  await app.listen(port, HOST);

  Logger.log(`🚀 Application ${SERVICE_NAME} is running on: ${await app.getUrl()}`, 'Bootstrap');
}

bootstrap();
