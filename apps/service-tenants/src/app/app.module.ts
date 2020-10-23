import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app/config.module';
import { SERVICE_NAME } from '../constants';
import { PostgresDatabaseProviderModule } from '../providers/postgres/provider.module';
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [
    AppConfigModule.register({ serviceName: SERVICE_NAME, promPrefix: 'service_tenants_' }),
    PostgresDatabaseProviderModule,
    TenantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
