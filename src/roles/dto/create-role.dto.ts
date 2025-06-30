import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Name of the role',
    minLength: 3,
    example: 'admin',
  })
  @IsString()
  @MinLength(3)
  name: string;
}
