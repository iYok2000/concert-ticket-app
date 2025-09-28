import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`Concert API is running on: http://localhost:${port}`);
  console.log('Endpoints:');
  console.log('   GET    /concerts          - List all concerts');
  console.log('   POST   /concerts          - Create concert (Admin)');
  console.log('   DELETE /concerts/:id      - Delete concert (Admin)');
  console.log('   GET    /reservations/all  - All reservations (Admin)');
  console.log('   GET    /reservations/me   - My reservations');
  console.log('   POST   /reservations/:concertId - Make reservation');
  console.log('   DELETE /reservations/:id  - Cancel reservation');
  console.log('');
  console.log('✅ Ready for testing with Thunder Client!');
}

bootstrap();
