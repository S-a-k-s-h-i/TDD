import { Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req):Promise<any> {
    return req.user
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
