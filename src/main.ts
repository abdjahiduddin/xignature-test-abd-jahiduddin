import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common/services';
import { ConfigService } from '@nestjs/config/dist';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get('HOST_PORT');
  const env = process.env.STAGE;

  await app.listen(port);
  logger.log(`${env}, Application listening on port ${port}`);
}
bootstrap();
