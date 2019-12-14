import { AppService } from './app.service';
import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LoginUserDTO } from './users/dtos/loginUser.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('/api/commands/auth.login')
  async login(@Request() req) {
    return this.authService.generateLoginResponse(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/api/commands/auth.syncSession')
  async syncSession(@Request() req) {
    return this.authService.generateLoginResponse(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/api/queries/user.fetchProfile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
