import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const whitelist = ['http://localhost:9000'];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  // const reflector = new Reflector();
  // app.useGlobalGuards(new AtGuard(reflector));

  await app.listen(5000);
}
bootstrap();
