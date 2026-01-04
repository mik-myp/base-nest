import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动移除 DTO 中没有声明的字段
      transform: true, // 自动类型转换
    }),
  );

  // 启用 CORS
  app.enableCors();

  // Swagger接口文档
  const config = new DocumentBuilder()
    .setTitle('API 文档')
    .setDescription('接口说明')
    .setVersion('1.0.0')
    .addBearerAuth() // 支持 Authorization: Bearer xxx
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // http://localhost:3000/docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
