import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import { helmetOptions, validationPipeOptions } from './constants';

export const configure = (app: NestExpressApplication): number => {
  app.use(helmet(helmetOptions));
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  app.enableShutdownHooks();

  return parseInt(process.env.PORT) || 3000;
};
