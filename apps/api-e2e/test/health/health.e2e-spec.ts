/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HealthModule } from '../../../api/src/app/health/health.module';

describe('[Feature] Health - /_/healthz', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('Check liveness [GET /alive]', () => {
    return request(app.getHttpServer()).get('/_/healthz/alive').expect(HttpStatus.OK, { status: 'ok' });
  });

  it('Check readiness [GET /ready]', () => {
    return request(app.getHttpServer())
      .get('/_/healthz/ready')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        const expectedCoffee = jasmine.objectContaining({ status: 'ok' });
        expect(body).toEqual(expectedCoffee);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
