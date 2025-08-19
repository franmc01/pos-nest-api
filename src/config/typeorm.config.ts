import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: parseInt(configService.get('DATABASE_PORT')) || 5432,
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASS'),
  database: configService.get('DATABASE_NAME'),
  // ssl: configService.get('NODE_ENV') === 'production',
  ssl: true,
  logging: configService.get('NODE_ENV') === 'development',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // synchronize: configService.get('NODE_ENV') !== 'production',
  synchronize: true,
});
