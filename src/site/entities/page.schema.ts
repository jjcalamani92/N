import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../common/abstract/abstract.schema';
import * as mongoose from 'mongoose';
import { Section } from './section.model';
import { SectionSchema } from './section.schema';

@Schema({ timestamps: true, versionKey: false })
export class PageDocument extends AbstractDocument {
  @Prop()
  title: string;

  @Prop()
  href: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  // @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' } })
  // sections: Section[];
  @Prop([SectionSchema])
  sections: Section[];

  @Prop([String])
  keywords: string[];

  @Prop({
    default: true,
  })
  status: boolean;
}

export const PageSchema = SchemaFactory.createForClass(PageDocument);
