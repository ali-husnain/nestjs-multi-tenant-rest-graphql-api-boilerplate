import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mts, User } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Mts])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
