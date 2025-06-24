import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client } from 'pg';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
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
