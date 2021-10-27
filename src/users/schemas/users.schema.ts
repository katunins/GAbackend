import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  userPic: string;

  @Prop()
  about: string;

  @Prop()
  accessToken: string;

  @Prop()
  birthday: string;

  @Prop({ type: [Object] })
  relatives: [{
    id: string;
    type: string;
  }];
}

export const UsersSchema = SchemaFactory.createForClass(User);
