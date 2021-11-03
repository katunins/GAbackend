import { Injectable } from '@nestjs/common';
import { Relative, RelativeDocument } from './schemas/relative.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RelativeDto } from './dto/relative.dto';
import { IRelativeUpdateData } from './relatives.controller';
import { RelativesIdsDto } from './dto/relativesIds.dto';
import { removeFilesBackground } from '../helpers';

@Injectable()
export class RelativesService {
  constructor(@InjectModel(Relative.name) private RelativeModel: Model<RelativeDocument>) {
  }

  async createRelative(relativeDto: RelativeDto): Promise<Relative> {
    const relative = new this.RelativeModel(relativeDto).save();
    return relative;
  }

  async getRelatives(relativesIds: RelativesIdsDto): Promise<Relative[]> {
    const relatives = await this.RelativeModel.find({ _id: { $in: relativesIds.relativesIds } });
    return relatives;
  }

  async updateRelative(data: IRelativeUpdateData): Promise<Relative> {
    const relative = await this.RelativeModel.findByIdAndUpdate(data.id, data.userData);
    return relative;
  }

  async deleteRelative(data: IRelativeUpdateData) {
    setTimeout(() => removeFilesBackground([data.userData.userPic]), 10000);
    const result = await this.RelativeModel.findByIdAndDelete(data.id);
    return result;
  }
}
