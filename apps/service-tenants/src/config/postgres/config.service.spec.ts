import { Test, TestingModule } from '@nestjs/testing';
import { PostgresConfigService } from './config.service';
import { postgresConfig } from './configuration';

describe('PostgresConfigService', () => {
  let service: PostgresConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostgresConfigService,
        {
          provide: postgresConfig.KEY,
          useValue: {
            url: 'postgres://user:pass@host:5432/dbname',
            synchronize: true,
          },
        },
      ],
    }).compile();

    service = module.get<PostgresConfigService>(PostgresConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('basic tests', () => {
    expect(service.host).toEqual('host');
    expect(service.name).toEqual('dbname');
    expect(service.password).toEqual('pass');
    expect(service.port).toEqual(5432);
    expect(service.synchronize).toEqual(true);
    expect(service.url).toEqual('postgres://user:pass@host:5432/dbname');
    expect(service.username).toEqual('user');
  });
});
