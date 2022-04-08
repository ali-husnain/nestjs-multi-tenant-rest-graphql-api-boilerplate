import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';

//controllers
import { AppController } from './app.controller';
//services
import { AppService } from './app.service';

//modules
import {
  StoreModule,
  TenancyModule,
  CustomerModule,
  TicketModule,
  AuthModule,
} from './modules';

//entities
import { Store, User, Mts, Customer, Subdomain } from './entities';

//middlewares
import { CookieAuthMiddleware } from './middlewares/cookie-auth.middleware';
import { DbManager } from './common/utils/db-manager.utils';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.MYSQLHOST,
      port: parseInt(env.MYSQLPORT),
      username: env.MYSQLUSERNAME,
      password: env.MYSQLPASSWORD,
      database: env.MYSQLDATABASE,
      autoLoadEntities: true,
      synchronize: false, //always do this false otherwise this will alter the table according to import entitie.
    }),
    TypeOrmModule.forFeature([User, Mts, Store, Subdomain, Customer]), //import user entity for database interaction in imported modules
    StoreModule,
    TenancyModule,
    CustomerModule,
    AuthModule,
    TicketModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      //installSubscriptionHandlers: true,
      playground: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DbManager],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieAuthMiddleware)
      .exclude('/auth/login', '/')
      .forRoutes('*');
  }
}
