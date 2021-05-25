require('dotenv').config()
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getDbConnectionOptions, runDbMigrations } from '@shared/utils';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.forRoot(await getDbConnectionOptions(process.env.NODE_ENV))
  );
  await runDbMigrations();
  await app.listen(PORT);

  Logger.log(`Server is listening on port: ${PORT}`)
}
bootstrap();
