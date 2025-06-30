// src/roles/roles.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(data: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(data);
    await this.roleRepository.save(role);
    this.logger.log(`Rol creado: ${role.name}`);
    return role;
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: number, data: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    Object.assign(role, data);
    await this.roleRepository.save(role);
    this.logger.log(`Rol actualizado: ${role.name}`);
    return role;
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
    this.logger.warn(`Rol eliminado: ${role.name}`);
  }
}
