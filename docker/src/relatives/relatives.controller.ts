import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { RelativesService } from './relatives.service';
import { BadRequestFilter } from '../mongo-exception.filter';
import { RelativeDto } from './dto/relative.dto';
import { Relative } from './schemas/relative.schema';
import { RelativesIdsDto } from './dto/relativesIds.dto';

export interface IRelativeUpdateData {
  id: string;
  userData: RelativeDto;
}

@Controller('relatives')
export class RelativesController {
  constructor(private readonly relativesService: RelativesService) {
  }

  @Post()
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() relativeDto: RelativeDto): Promise<Relative> {
    return this.relativesService.createRelative(relativeDto);
  }

  @Get()
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.OK)
  // get(@Query() relativesIds: RelativesIdsDto): Promise<Relative[]> {
  //   return this.relativesService.getRelatives(relativesIds);
  // }
  get(@Query() query: { userId: string }): Promise<Relative[]> {
    return this.relativesService.getRelatives(query.userId);
  }

  @Patch()
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.CREATED)
  update(@Body() data: IRelativeUpdateData): Promise<Relative> {
    return this.relativesService.updateRelative(data);
  }

  @Delete()
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.OK)
  delete(@Body() data: IRelativeUpdateData) {
    return this.relativesService.deleteRelative(data);
  }
}
