import { ValidationPipeOptions } from '@nestjs/common';
import * as helmet from 'helmet';

export const SERVICE_NAME = 'dev.gperdomor.odin.api';
export const HOST = '0.0.0.0';

export const helmetOptions: Parameters<typeof helmet>[0] = {};

export const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
};
