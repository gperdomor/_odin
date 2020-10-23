import { registerAs } from '@nestjs/config';
import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import * as Joi from 'joi';

interface PostgresConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  url: string;
  synchronize: boolean;
}

export const postgresConfig = registerAs<ConfigFactory<PostgresConfig>>('postgres', () => ({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  url: process.env.DATABASE_URL,
  synchronize: process.env.DATABASE_SYNC === 'true',
}));

export const postgresValidationSchema = Joi.object({
  DATABASE_URL: Joi.string().uri({ scheme: ['postgres'] }),
  DATABASE_HOST: Joi.when('DATABASE_URL', { is: Joi.valid(null), then: Joi.string().hostname().required() }),
  DATABASE_PORT: Joi.when('DATABASE_URL', { is: Joi.valid(null), then: Joi.number().default(5432) }),
  DATABASE_USERNAME: Joi.when('DATABASE_URL', { is: Joi.valid(null), then: Joi.string().required() }),
  DATABASE_PASSWORD: Joi.when('DATABASE_URL', { is: Joi.valid(null), then: Joi.string().required() }),
  DATABASE_NAME: Joi.when('DATABASE_URL', { is: Joi.valid(null), then: Joi.string().required() }),
  DATABASE_SYNC: Joi.boolean().default(false),
}).xor('DATABASE_URL', 'DATABASE_HOST');
