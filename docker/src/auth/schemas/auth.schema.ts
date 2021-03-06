import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document

@Schema()
export class Auth {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
