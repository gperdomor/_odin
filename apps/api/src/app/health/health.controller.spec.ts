import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('Health Controller', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('liveness', () => {
    it('Should return the status', async () => {
      expect(await controller.livenessCheck()).toEqual({ status: 'ok' });
    });
  });

  describe('readiness', () => {
    it('Should return the status', async () => {
      expect(await controller.readinessCheck()).toEqual(jasmine.objectContaining({ status: 'ok' }));
    });
  });
});
