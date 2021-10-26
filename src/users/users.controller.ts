import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';

// express
// app.use((req, res, next) => {
//   res.status(201).end('Poka')
// })

@Controller('users')
export class UsersController {

  constructor(private readonly userssService: UsersService) {
  }

  // @Get()
  // // @Redirect('https://google.com', 301)
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   res.status(201).end('Poke')
  //   return 'getAll'
  // }

  @Get()
  getAll(): Promise<User[]> {
    return this.userssService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.userssService.getById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createUserDto: CreateUsersDto): Promise<User> {
    return this.userssService.create(createUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.userssService.remove(id)
  }

  @Put(':id')
  update(@Body() updateUserDto: UpdateUsersDto, @Param('id') id: string): Promise<User> {
    return this.userssService.update(id, updateUserDto)
  }

}
