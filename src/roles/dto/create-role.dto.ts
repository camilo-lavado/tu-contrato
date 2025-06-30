// src/roles/dtos/create-role.dto.ts
import { IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MinLength(3)
  name: string;
}
