import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { AppConfigService } from './config/app/config.service';
import { configure } from './configure';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  configure(app);

  const appConfig = app.get(AppConfigService);

  await app.listen(appConfig.port);

  Logger.log(`🚀 Application ${appConfig.name} is running on: ${await app.getUrl()}`, 'Bootstrap');
}

bootstrap();
