import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { env } from 'process';
import { ValidationError } from 'class-validator';

import * as cookieParser from 'cookie-parser';
import {
  ValidationPipe,
  UnprocessableEntityException,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import * as session from 'express-session';
import { createClient } from 'redis';
import * as RedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // @ToDo: Will be uncommented on server after installing redis
  // const redisClient = createClient({ legacyMode: true });
  // await redisClient.connect().catch(console.error);
  app.use(cookieParser());
  // somewhere in your initialization file
  app.use(
    session({
      // @ToDo: Will be uncommented on server after installing redis
      // store: new (RedisStore(session))({ client: redisClient }),
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      name: 'express_session',
      cookie: {
        sameSite: true,
        httpOnly: false,
        maxAge: 60000,
      },
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      // exceptionFactory: (errors: Array<ValidationError>) => {
      //   const _errors = errors.reduce((v: any, newVal: ValidationError) => {
      //     v[newVal.property] = Object.values(newVal.constraints);
      //     return v;
      //   }, {});
      //   return new UnprocessableEntityException(_errors);
      // },
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); //will hide data from respone like password of user entity (serialization in nestjs)

  // app.enableCors();
  const server = await app.listen(env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
  server.setTimeout(1800000);
}
bootstrap();
