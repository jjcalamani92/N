import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Page } from './page.model';
import { AbstractDocument } from '../../common/abstract/abstract.schema';
import { User } from '../../user/entities/user.model';

@Schema()
export class SectionDocument extends AbstractDocument {
  @Prop()
  title: string;

  @Prop()
  href: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({
    default: true,
  })
  status: boolean;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Page.name })
  // page: Page | string;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'user' })
  user: User | string;
}

export const SectionSchema = SchemaFactory.createForClass(SectionDocument);
SectionSchema.pre<SectionDocument>('save', function (next) {
  this.title = this.title.toLowerCase();
  next();
});
