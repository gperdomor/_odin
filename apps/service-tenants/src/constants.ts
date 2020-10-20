import { ValidationPipeOptions } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as helmet from 'helmet';

export const SERVICE_NAME = 'dev.gperdomor.odin.service.tenants';

export const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
};

export const corsOptions: CorsOptions = {};

export const helmetOptions: Parameters<typeof helmet>[0] = {};
