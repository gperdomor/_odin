import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as slugify from '@sindresorhus/slugify';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
  logger = new Logger(TenantsService.name);

  /**
   * @constructor
   * @param tenantRepository {TenantRepository}
   */
  constructor(@InjectRepository(Tenant) private readonly tenantRepository: Repository<Tenant>) {}

  async create(createTenantDto: CreateTenantDto) {
    // TODO: Check to make sure logged in user is not null
    // if (!user || user.id === null) {
    //   throw new ForbiddenException('User not logged in');
    // }

    const tenant = this.tenantRepository.create({
      ...createTenantDto,
    });

    // Generate a unique slug for tenant
    tenant.normalizedName = slugify(createTenantDto.name);
    const tenantExist = await this.tenantRepository.findOne(
      { normalizedName: tenant.normalizedName },
      { withDeleted: true },
    );

    if (tenantExist) {
      throw new ConflictException('Tenant name is unavailable, try another name');
    }

    // TODO: Check for tenant with free plan, limit to only one by user

    // TODO: Create tenant member

    // TODO: Inform to billing service?

    return this.tenantRepository.save(tenant);
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findOne(id: string): Promise<Tenant> {
    // TODO: return with members?
    const tenant = await this.tenantRepository.findOne(id);

    if (!tenant) {
      throw new NotFoundException(`Tenant #${id} not found`);
    }

    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    const tenant = await this.tenantRepository.preload({
      id: id,
      ...updateTenantDto,
      // flavors,
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant #${id} not found`);
    }

    return this.tenantRepository.save(tenant);
  }

  async remove(id: string): Promise<Tenant> {
    const tenant = await this.findOne(id);
    return this.tenantRepository.softRemove(tenant);
  }

  async restore(id: string): Promise<void> {
    const tenant = await this.tenantRepository.findOne(id, { withDeleted: true });

    if (!tenant) {
      throw new NotFoundException(`Tenant #${id} not found`);
    }

    await this.tenantRepository.restore(id);
  }
}
