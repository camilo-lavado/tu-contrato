import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiPropertyOptional({ minLength: 3, type: String, description: 'Role name' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;
}
