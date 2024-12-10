import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'], // Permite o frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Inclua todos os métodos que sua API usa
    credentials: true, // Permite cookies, se necessário
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Garante a transformação dos dados
      whitelist: true, // Remove propriedades não definidas nos DTOs
      forbidNonWhitelisted: false, // Ignora propriedades não esperadas
    }),
  );

  await app.listen(4000);
}
bootstrap();
