import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { capitalizar, slug } from 'src/common/utils/function';
import { ProductDocument } from './product.schema';

@Schema({ timestamps: true, versionKey: false })
export class PaintDocument extends ProductDocument {

  @Prop(() => [String])
  use: string[];
  @Prop(() => [String])
  color: string[];
}
export const PaintSchema = SchemaFactory.createForClass(PaintDocument);

PaintSchema.pre<PaintDocument>('save', function (next) {
  this.title = capitalizar(this.title);
  this.brand = this.brand.toLowerCase();
  this.category = this.category.toLowerCase();
  this.subCategory = this.subCategory.toLowerCase();
  this.slug = slug(this.title);
  next();
});
