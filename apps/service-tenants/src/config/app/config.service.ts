import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { appConfig } from './configuration';
import { APP_NAME } from './constants';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(
    @Inject(appConfig.KEY) private readonly config: ConfigType<typeof appConfig>,
    @Inject(APP_NAME) private readonly appName: string,
  ) {}

  get name(): string {
    return this.appName;
  }

  get env(): string {
    return this.config.env;
  }

  get port(): number {
    return Number(this.config.port);
  }
}
