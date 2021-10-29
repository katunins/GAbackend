import { Body, Controller, HttpCode, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { RelativesService } from './relatives.service';
import { BadRequestFilter } from '../mongo-exception.filter';
import { RelativeDto } from './dto/relative.dto';
import { Relative } from './schemas/relative.schema';

export interface IRelativeUpdateData {
  id: string;
  userData: RelativeDto;
}

@Controller('relatives')
export class RelativesController {
  constructor(private readonly relativesService: RelativesService) {
  }

  @Post('create')
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() relativeDto: RelativeDto): Promise<Relative> {
    return this.relativesService.createRelative(relativeDto);
  }

  @Post('update')
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.CREATED)
  update(@Body() data: IRelativeUpdateData): Promise<Relative> {
    return this.relativesService.updateRelative(data);
  }

  @Post('delete')
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.OK)
  delete(@Body() data: IRelativeUpdateData): Promise<any> {
    return this.relativesService.deleteRelative(data.id);
  }

  @Post('get')
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.OK)
  get(@Body() idArr: string[]): Promise<Relative[]> {
    return this.relativesService.get(idArr);
  }
}
