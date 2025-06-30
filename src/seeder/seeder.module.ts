// src/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { RolesModule } from '@app/roles/roles.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [RolesModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
