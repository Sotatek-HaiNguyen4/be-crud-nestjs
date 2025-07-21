import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: any) {
    return this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: any) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) throw new Error('Invalid credentials');
    return this.authService.login(user);
  }
}
