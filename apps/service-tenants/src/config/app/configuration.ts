import { registerAs } from '@nestjs/config';
import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import * as Joi from 'joi';

interface AppConfig {
  env: string;
  port: number;
}

export const appConfig = registerAs<ConfigFactory<AppConfig>>('app', () => ({
  env: process.env.APP_ENV,
  port: Number(process.env.APP_PORT),
}));

export const appValidationSchema = Joi.object({
  APP_ENV: Joi.string().valid('development', 'production', 'staging', 'test', 'provision').default('development'),
  APP_PORT: Joi.number().default(3000),
});
