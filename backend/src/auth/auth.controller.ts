import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { Public } from 'src/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  async register(
    @Body() body: { email: string; name: string; password: string },
  ) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('oauth')
  async oauthLogin(
    @Body()
    body: {
      email: string;
      name: string;
      provider: string;
      providerId: string;
    },
  ) {
    return this.authService.oauthLogin(body);
  }
}
