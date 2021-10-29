import { Injectable } from '@nestjs/common';
import { Relative, RelativeDocument } from './schemas/relative.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RelativeDto } from './dto/relative.dto';
import { IRelativeUpdateData } from './relatives.controller';

@Injectable()
export class RelativesService {
  constructor(@InjectModel(Relative.name) private RelativeModel: Model<RelativeDocument>) {
  }

  async createRelative(relativeDto: RelativeDto): Promise<Relative> {
    const relative = new this.RelativeModel(relativeDto).save();
    return relative;
  }

  async get(idArr: string[]): Promise<Relative[]> {
    const relatives = await this.RelativeModel.find({ _id: { $in: idArr } });
    return relatives;
  }

  async updateRelative(data: IRelativeUpdateData): Promise<Relative> {
    const relative = this.RelativeModel.findByIdAndUpdate(data.id, data.userData);
    return relative;
  }

  async deleteRelative(id: string) {
    const result = await this.RelativeModel.findByIdAndDelete(id);
    return result;
  }
}
