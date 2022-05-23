// import { ObjectType, Field } from '@nestjs/graphql';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { RelayTypes } from 'src/common/relay/relay.types';
// import { Product } from './product.entity';
// @Schema({ timestamps: true, versionKey: false })
// @ObjectType()
// export class Paint extends Product {
//   @Field(() => [String])
//   @Prop(() => [String])
//   color: string[];


//   @Field(() => [String])
//   @Prop(() => [String])
//   use: string[];

// }
// export const PaintSchema = SchemaFactory.createForClass(Paint);

// @ObjectType()
// export class ListPaintResponse extends RelayTypes<Paint>(Paint) {}