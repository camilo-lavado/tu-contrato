// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

// Módulos funcionales (se irán agregando)
//import { AuthModule } from './auth/auth.module';
//import { UsersModule } from './users/users.module';
//import { RolesModule } from './roles/roles.module';
// import { TemplatesModule } from './templates/templates.module'; // y así...

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60_000, // 1 min
          limit: 10, // máximo 10 peticiones por IP
        },
      ],
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, //Solo durante desarrollo
      ssl:
        process.env.DATABASE_SSL === 'true'
          ? { rejectUnauthorized: false }
          : undefined,
    }),

    // Módulos funcionales
    //AuthModule,
    //UsersModule,
    //RolesModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
