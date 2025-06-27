import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('TuContrato API')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('api', app, document);
    console.log('📚 Swagger habilitado en /api');
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('🔥 Error en bootstrap:', err);
  process.exit(1);
});
