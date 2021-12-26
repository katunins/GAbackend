import {
  Body,
  Controller, HttpCode, HttpStatus, UseFilters, Post, Delete, Get, Query, Req, Patch,
} from '@nestjs/common';
import { BadRequestFilter } from '../mongo-exception.filter';
import { NoteDto } from './dto/note.dto';
import { Note } from './schemas/note.schema';
import { NotesService } from './notes.service';

export interface INoteUpdateData {
  id: string;
  noteData: NoteDto;
}

@Controller('notes')
export class NotesController {

  constructor(private readonly notesService: NotesService) {
  }

  @Get()
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.OK)
  get(@Req() req: any): Promise<Note[]> {
    return this.notesService.get(req);
  }

  @Post()
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() noteDto: NoteDto): Promise<Note> {
    return this.notesService.create(noteDto);
  }

  @Patch()
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.CREATED)
  update(@Body() data: INoteUpdateData): Promise<Note> {
    return this.notesService.update(data);
  }

  @Delete()
  @UseFilters(BadRequestFilter)
  @HttpCode(HttpStatus.OK)
  delete(@Body() data: INoteUpdateData) {
    return this.notesService.delete(data);
  }
}
