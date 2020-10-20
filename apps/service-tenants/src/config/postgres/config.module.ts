import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConfigService } from './config.service';
import { postgresConfig, postgresValidationSchema } from './configuration';

/**
 * Import and provide postgres configuration related classes.
 *
 * @module
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      load: [postgresConfig],
      validationSchema: postgresValidationSchema,
    }),
  ],
  providers: [ConfigService, PostgresConfigService],
  exports: [ConfigService, PostgresConfigService],
})
export class PostgresConfigModule {}
