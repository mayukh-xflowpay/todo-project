import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return { id: user.id, email: user.email, name: user.name };
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user,
    };
  }

  async register(dto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.createUser(
      dto.email,
      dto.name,
      hashed,
    );
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user,
    };
  }

  async oauthLogin(oauthUser: {
    email: string;
    name: string;
    provider: string;
    providerId: string;
  }) {
    let user = await this.usersService.findByEmail(oauthUser.email);

    if (!user) {
      // create new OAuth user
      user = await this.usersService.createOAuthUser(
        oauthUser.email,
        oauthUser.name,
        oauthUser.provider,
        oauthUser.providerId,
      );
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findByID(decoded.sub);

      if (!user) throw new Error('Invalid Token');

      const newAccessToken = this.jwtService.sign(
        { sub: user.id, email: user.email },
        { expiresIn: '1d' },
      );
      return { access_token: newAccessToken };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
