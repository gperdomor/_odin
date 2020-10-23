import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import { corsOptions, helmetOptions, validationPipeOptions } from './constants';

export const configure = (app: NestExpressApplication): void => {
  app.enableCors(corsOptions);
  app.use(helmet(helmetOptions));

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  app.enableShutdownHooks();
};
