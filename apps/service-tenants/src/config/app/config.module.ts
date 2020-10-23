import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AppConfigService } from './config.service';
import { appConfig, appValidationSchema } from './configuration';
import { APP_NAME } from './constants';

export interface AppConfigOpts {
  serviceName: string;
  promPrefix: string;
}

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Global()
@Module({})
export class AppConfigModule {
  static register(opts: AppConfigOpts): DynamicModule {
    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({
          expandVariables: true,
          load: [appConfig],
          validationSchema: appValidationSchema,
        }),
        PrometheusModule.register({
          defaultMetrics: {
            enabled: true,
            config: {
              prefix: opts.promPrefix,
            },
          },
        }),
      ],
      providers: [ConfigService, AppConfigService, { provide: APP_NAME, useValue: opts.serviceName }],
      exports: [ConfigService, AppConfigService],
    };
  }
}
