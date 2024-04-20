import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    stopAtFirstError: true,
    exceptionFactory: (errors: ValidationError[]) => {
      return new BadRequestException(errors.map(error => {
        return {
          field: error.property,
          message: Object.values(error.constraints)[0]
        }
      }))
    }
  }))

  const config = new DocumentBuilder()
    .setTitle('Ecommerce Test API using NestJS')
    .setDescription('In this application users can create accounts, purchase available products and create and view their orders.')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(3000);
}
bootstrap();
