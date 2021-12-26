import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { NoteDto } from './dto/note.dto';
import { removeFilesBackground } from '../helpers';
import { INoteUpdateData } from './notes.controller';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private NoteModel: Model<NoteDocument>) {
  }

  async get(req): Promise<Note[]> {
    const relatives = await this.NoteModel.find({ creator: req.headers.userid });
    return relatives;
  }

  async create(noteDto: NoteDto): Promise<Note> {
    const result = new this.NoteModel(noteDto).save();
    return result;
  }

  async update(data: INoteUpdateData): Promise<Note> {
    const { id, noteData } = data;
    const result = await this.NoteModel.findByIdAndUpdate(id, noteData);
    return result;
  }

  async delete(data: INoteUpdateData) {
    setTimeout(() => removeFilesBackground(data.noteData.images), 10000);
    const result = await this.NoteModel.findByIdAndDelete(data.id);
    return result;
  }
}
