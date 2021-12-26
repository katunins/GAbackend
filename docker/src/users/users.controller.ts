import {
  Body,
  Controller, HttpCode, HttpStatus, Post, UseFilters, Headers, Req, Res, Put, Patch, Param, Get, Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { BadRequestFilter } from '../mongo-exception.filter';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/user.schema';

export interface IUserUpdateData {
  id: string;
  userData: UserDto;
}

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() userDto: UserDto, @Req() req: any, @Res() res: any): Promise<User> {
    return this.usersService.createUser(userDto, req, res);
  }

  @Get()
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.ACCEPTED)
  async signIn(@Query() loginDto: LoginDto, @Req() req: any, @Res() res: any): Promise<User> {
    return await this.usersService.getUser(loginDto, req, res);
  }

  @Patch()
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Body() data: IUserUpdateData): Promise<User> {
    return this.usersService.updateUser(data);
  }
}
