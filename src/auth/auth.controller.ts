import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.authenticate(loginDto);
    if (user) {
      const cookie = this.authService.getLoginCookie(user);
      this.authService.setLoginCookie(cookie, response);
      await this.authService.setDatabaseHeader(user.sub_id, response);
      return { success: true };
    } else {
      throw new UnauthorizedException();
    }
  }
}
