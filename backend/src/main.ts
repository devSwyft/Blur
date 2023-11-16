import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    always: true,
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    exceptionFactory: (errors) =>
      new BadRequestException(
        'VALIDATION_FAILED: ' +
        errors
          .map((v) => Object.values(v.constraints ?? {}))
          .flat().join('\n'))
  }))

  const docs = new DocumentBuilder()
    .setTitle('Blur')
    .setDescription('BLUR: Next Generation Social Network Service.')
    .setVersion('0.0')
    .addTag('auth', 'Authorization & Authentication')
    .addTag('users', 'User profile & management')
    .addTag('posts', 'Post & management')
    .addCookieAuth('TOKEN')
    .build()

  const document = SwaggerModule.createDocument(app, docs)
  SwaggerModule.setup('/api', app, document)

  await app.listen(3000);
}
bootstrap();
