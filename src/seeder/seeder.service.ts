// src/seeder/seeder.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { RolesService } from '@app/roles/roles.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(private readonly rolesService: RolesService) {}

  async seed() {
    const roles = await this.rolesService.findAll();
    if (roles.length === 0) {
      await this.rolesService.create({ name: 'admin' });
      await this.rolesService.create({ name: 'user' });
      this.logger.log('Roles base insertados: admin, user');
    } else {
      this.logger.log('Roles ya existentes, se omite seed');
    }
  }
}
