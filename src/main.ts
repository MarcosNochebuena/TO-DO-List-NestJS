import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import { AppModule } from './app.module';
import { Client } from 'pg';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Todo List API')
    .setDescription('API para gestionar una lista de tareas')
    .setVersion('1.0')
    .addTag('tasks')
    .addTag('users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

async function createDatabaseIfNotExists() {
  const client = new Client({
    user: 'develop',
    host: 'localhost',
    password: 'dev12345',
    port: 5432,
    database: 'postgres', // base del sistema
  });

  await client.connect();

  const res = await client.query(
    `SELECT 1 FROM pg_database WHERE datname='todo_list'`,
  );
  if (res.rowCount === 0) {
    await client.query(`CREATE DATABASE "todo_list"`);
    console.log('✅ Base de datos creada');
  } else {
    console.log('🟢 La base de datos ya existe');
  }

  await client.end();
}
createDatabaseIfNotExists();
bootstrap();
