import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { postgresConfig } from './configuration';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class PostgresConfigService {
  constructor(@Inject(postgresConfig.KEY) private config: ConfigType<typeof postgresConfig>) {}

  get name(): string {
    return this.config.url ? new URL(this.config.url).pathname.substring(1) : this.config.database;
  }

  get host(): string {
    return this.config.url ? new URL(this.config.url).hostname : this.config.host;
  }

  get password(): string {
    return this.config.url ? new URL(this.config.url).password : this.config.password;
  }

  get port(): number {
    return this.config.url ? Number(new URL(this.config.url).port) : this.config.port;
  }

  get synchronize(): boolean {
    return this.config.synchronize;
  }

  get username(): string {
    return this.config.url ? new URL(this.config.url).username : this.config.username;
  }

  get url(): string {
    return this.config.url || `postgres://${this.username}:${this.password}@${this.host}:${this.port}/${this.name}`;
  }
}
