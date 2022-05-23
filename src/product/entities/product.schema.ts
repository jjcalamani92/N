import { Prop, Schema } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';

@Schema({ timestamps: true, versionKey: false })
export class ProductDocument extends AbstractDocument {
  @Prop()
  title: string;

  @Prop()
  brand: string;

  @Prop()
  description: string;

  @Prop(() => [String])
  image: string[];

  @Prop()
  inStock: number;

  @Prop()
  slug: string;

  @Prop()
  category: string;

  @Prop()
  subCategory: string;

  @Prop()
  price: number;

  @Prop(() => [String])
  tags: string[];

  @Prop({
    default: true,
  })
  status: boolean;
}

