import {
  Controller, HttpCode, HttpStatus, UseFilters, Get, Post, Body
} from '@nestjs/common';
import { BadRequestFilter } from '../mongo-exception.filter';
import { Auth } from './schemas/auth.schema';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Get()
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.ACCEPTED)
  async check() {
    return {};
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  passwordRestore(@Body() authDto: AuthDto): Promise<Auth> {
    return this.authService.passwordRestore(authDto);
  }

  // signUp(@Body() userDto: UserDto, @Req() req: any, @Res() res: any): Promise<User> {
  //   return this.usersService.createUser(userDto, req, res);
  // }
}
