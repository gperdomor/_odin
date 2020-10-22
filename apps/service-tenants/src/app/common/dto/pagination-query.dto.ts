import { IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationQueryDto {
  static DEFAULT_LIMIT = 30;

  @IsOptional()
  @IsPositive()
  @Max(100)
  readonly limit: number = PaginationQueryDto.DEFAULT_LIMIT;

  @IsOptional()
  @IsPositive()
  readonly page: number;
}
