import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RelativeDocument = Relative & Document

@Schema()
export class Relative {
  @Prop({ required: true })
  name: string;

  @Prop()
  userPic: string;

  @Prop()
  about: string;

  @Prop()
  birthday: string;

  @Prop({ type: Object, required: true })
  access: {
    creatorId: string;
    shareId: [string];
  };
}

export const RelativeSchema = SchemaFactory.createForClass(Relative);
