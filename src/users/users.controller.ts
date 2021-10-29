import {
  Body,
  Controller, HttpCode, HttpStatus, Post, UseFilters, Headers, Req, Res,
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

  @Post('signup')
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @Post('login')
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.ACCEPTED)
  signIn(@Body() loginDto: LoginDto, @Req() req: any, @Res() res: any): Promise<User> {
    return this.usersService.getUser(loginDto, req, res);
  }

  @Post('update')
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Body() data: IUserUpdateData): Promise<User> {
    return this.usersService.updateUser(data);
  }
}
