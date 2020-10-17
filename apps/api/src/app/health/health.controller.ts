import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult, HealthCheckService } from '@nestjs/terminus';

@Controller('/_/healthz')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get('alive')
  async livenessCheck(): Promise<{ status: string }> {
    return { status: 'ok' };
  }

  @Get('ready')
  @HealthCheck()
  async readinessCheck(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }
}
