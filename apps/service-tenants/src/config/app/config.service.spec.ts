import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from './config.service';
import { appConfig } from './configuration';
import { APP_NAME } from './constants';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: appConfig.KEY,
          useValue: {},
        },
        {
          provide: APP_NAME,
          useValue: 'testing-app',
        },
      ],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
