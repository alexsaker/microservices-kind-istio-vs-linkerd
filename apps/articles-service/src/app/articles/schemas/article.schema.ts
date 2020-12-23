import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true })
  label: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
