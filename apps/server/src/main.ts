import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PORT } from './utils/service/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Thêm cấu hình CORS để cho phép client kết nối
  app.enableCors({
    origin: true, // hoặc chỉ định rõ origin: 'http://localhost:3000'
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(PORT);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
