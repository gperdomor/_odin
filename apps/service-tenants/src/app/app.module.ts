import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../config/app/config.module';
import { SERVICE_NAME } from '../constants';
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [
    AppConfigModule.register({ serviceName: SERVICE_NAME, promPrefix: 'service_tenants_' }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TenantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
