import { LinkHeaderInterceptor, Pageable } from '@algoan/nestjs-pagination';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  async create(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    return this.tenantsService.create(createTenantDto);
  }

  @UseInterceptors(new LinkHeaderInterceptor({ resource: 'tenants', defaultLimit: PaginationQueryDto.DEFAULT_LIMIT }))
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Pageable<Tenant>> {
    const [data, count] = await this.tenantsService.findAllAndCount(paginationQuery);

    return { totalDocs: count, resource: data };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Tenant> {
    return this.tenantsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Tenant> {
    return this.tenantsService.remove(id);
  }

  @Post(':id/restore')
  async restore(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tenantsService.restore(id);
  }
}
