import {
  Body,
  Controller, HttpCode, HttpStatus, Post, UseFilters, Headers
} from '@nestjs/common';
import { UsersService } from './users.service';
import { BadRequestFilter } from '../mongo-exception.filter';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/users.schema';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @Post('signup')
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() userDto: UserDto, @Headers() headers) {
    return this.usersService.createUser(userDto, headers);
  }

  @Post('login')
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.ACCEPTED)
  SignIn(@Body() loginDto: LoginDto, @Headers() headers) {
    return this.usersService.getUser(loginDto, headers);
  }

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // getAll(): Promise<User[]> {
  //   return this.usersService.getAll();
  // }
  //
  // @Get(':id')
  // getOne(@Param('id') id: string): Promise<User> {
  //   return this.usersService.getById(id);
  // }
  //
  //
  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<User> {
  //   return this.usersService.remove(id);
  // }
  //
  // @Put(':id')
  // update(@Body() updateUserDto: LoginDto, @Param('id') id: string): Promise<User> {
  //   return this.usersService.update(id, updateUserDto);
  // }

}
