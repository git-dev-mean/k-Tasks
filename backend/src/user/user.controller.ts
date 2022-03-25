import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './guard';
import { UserService } from './user.service';


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const result = await this.userService.register(name, email, password);
    return { result };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const result = await this.userService.login(email, password);
    return result;
  }

  @UseGuards(JwtGuard)
  @Get('users')
  async getAllUser() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get('user/:id')
  async getUser(@Param('id') userId: string) {
    const user = await this.userService.getSingleUser(userId);
    return user;
  }
}
