import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //necessário para que seja possivel validações
  //a linha abaixo desativa o chato do eslint pqp
  // eslint-disable-next-line prettier/prettier
  app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
