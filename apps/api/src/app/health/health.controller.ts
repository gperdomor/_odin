import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult, HealthCheckService } from '@nestjs/terminus';

@Controller('/_/healthz')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get('liveness')
  async livenessCheck(): Promise<{ status: string }> {
    return { status: 'ok' };
  }

  @Get('readiness')
  @HealthCheck()
  async readinessCheck(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }
}
