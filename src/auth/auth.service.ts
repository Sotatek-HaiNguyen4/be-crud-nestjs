import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateGoogleToken(credential: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) throw new Error('Token invalid');

    const user = await this.userService.findOrCreateByGoogle(payload);

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    });

    return { accessToken, user };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: { name: string; email: string; password: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    return this.userService.create({ ...data, password: hashed });
  }
}
