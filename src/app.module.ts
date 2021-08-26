import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Config
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, database } from '@configs';
import * as Joi from 'joi';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, database],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('prod'),
        PORT: Joi.number().default(3000),

        APP_NAME: Joi.string().default('Base-Nest'),
        APP_URL: Joi.string().default('http://localhsot'),

        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(3306),
        DB_USER: Joi.string().default('root'),
        DB_PWD: Joi.string().default('1234'),
        DB_NAME: Joi.string().default('app'),
      }),
      validationOptions: {
        // .ENV Test
        // allowUnknown: false,
        // abortEarly: false,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
