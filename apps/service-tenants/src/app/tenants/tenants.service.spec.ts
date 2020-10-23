import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { TenantsService } from './tenants.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('TenantsService', () => {
  let service: TenantsService;
  let tenantRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantsService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Tenant), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<TenantsService>(TenantsService);
    tenantRepository = module.get<MockRepository>(getRepositoryToken(Tenant));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when tenant with ID exists', () => {
      it('should return the tenant object', async () => {
        const tenantId = '1';
        const expectedTenant = {};

        tenantRepository.findOne.mockReturnValue(expectedTenant);

        const tenant = await service.findOne(tenantId);
        expect(tenant).toEqual(expectedTenant);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const tenantId = '1';
        tenantRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(tenantId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Tenant #${tenantId} not found`);
        }
      });
    });
  });
});
