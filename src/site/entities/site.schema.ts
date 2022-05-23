import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../common/abstract/abstract.schema';

@Schema({ timestamps: true, versionKey: false })
export class SiteDocument extends AbstractDocument {
  @Prop({
    required: true,
  })
  title: string;

  @Prop()
  domain: string;

  @Prop()
  logo: string;

  @Prop()
  category: string;

  // @Prop({ type: mongoose.Schema.Types.String, ref: 'User' })
  // user: User;

  @Prop({
    default: true,
  })
  status: boolean;
}

export const SiteSchema = SchemaFactory.createForClass(SiteDocument);
