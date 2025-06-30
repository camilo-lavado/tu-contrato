import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { RolesModule } from './roles/roles.module';
import { RolesModule } from './roles/roles.module';

const getDatabaseUrl = (): string => {
  const env = process.env.NODE_ENV || 'development';

  const url =
    env === 'production'
      ? process.env.PROD_DATABASE_URL
      : env === 'test'
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL;

  const safeUrl = url?.replace(/:\/\/.*:(.*?)@/, '://****:****@');

  Logger.log(`🌍 NODE_ENV: ${env}`, 'Config');
  Logger.log(`🔌 Connecting to DB: ${safeUrl}`, 'Config');

  return url!;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60_000,
          limit: 10,
        },
      ],
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const synchronize = process.env.NODE_ENV !== 'production';
        const ssl =
          process.env.DATABASE_SSL === 'true'
            ? { rejectUnauthorized: false }
            : undefined;

        Logger.log(
          `🛠 synchronize: ${synchronize ? 'enabled ✅' : 'disabled ❌'}`,
          'TypeORM',
        );
        if (ssl) Logger.log('🔐 SSL: enabled', 'TypeORM');

        return {
          type: 'postgres',
          url: getDatabaseUrl(),
          autoLoadEntities: true,
          synchronize,
          ssl,
        };
      },
    }),

    RolesModule,

    // Módulos funcionales
    // AuthModule,
    // UsersModule,
    // RolesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
