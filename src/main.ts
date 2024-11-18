import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,    // Garante que a transformação dos dados seja feita
    whitelist: true,    // Remove propriedades não definidas nos DTOs
    forbidNonWhitelisted: true,  // Lança erro quando uma propriedade não é esperada
  }));
  await app.listen(3000);
}
bootstrap();
