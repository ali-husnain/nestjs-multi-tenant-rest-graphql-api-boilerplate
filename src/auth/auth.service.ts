import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { env } from 'process';
import { Mts, User } from 'src/entities';
import encrypter from 'src/common/utils/encrypter.utils';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as crypto from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) //This also a way to use master database connection
    private readonly userRepository: Repository<User>,
    @InjectRepository(Mts)
    private readonly mtsRepository: Repository<Mts>,
  ) {}

  async authenticate(loginDto: LoginDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.username,
      },
    });
    if (user) {
      const hashedPassword = crypto
        .createHash('md5')
        .update(loginDto.password)
        .digest('hex');
      if (hashedPassword === user.password) {
        return user;
      }
    }
    return undefined;
  }

  getLoginCookie(user: User) {
    const cookieObject = {
      uid: user.uid,
      store_id: user.store_id,
      sub_id: user.sub_id,
      ttl: new Date().getTime() + 86409000,
    };
    return encrypter.encrypt(JSON.stringify(cookieObject));
  }

  async setDatabaseHeader(sub_id, response) {
    const mtsConnection = await this.mtsRepository.findOne({
      where: { sub_id: sub_id },
    });
    if (mtsConnection) {
      response.set('x-tenant', mtsConnection.domain_db);
    } else {
      response.set('x-tenant', encrypter.encrypt(env.MYSQLDATABASE));
    }
  }

  setLoginCookie(cookie, response) {
    if (env.NODE_ENV == 'development') {
      response.cookie(env.COOKIE_NAME, cookie, {
        domain: env.DOMAIN,
        expires: new Date(new Date().getTime() + 86409000),
      });
    } else {
      response.cookie(env.COOKIE_NAME, cookie, {
        domain: env.DOMAIN,
        sameSite: 'lax',
        secure: true,
        expires: new Date(new Date().getTime() + 86409000),
      });
    }
  }
}
