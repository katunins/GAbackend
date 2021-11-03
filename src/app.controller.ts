import { Controller, Get, HttpException, HttpStatus, Param, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { env } from './environments/environments';
import { existsSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get(':uploads/:id/:filename')
  async getFile(@Param() param, @Req() req: any, @Res() res: any) {
    res.sendFile(param.filename, { root: `${param.uploads}/${param.id}` });
  }
}
