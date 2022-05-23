import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from './product.model';

@ObjectType()
export class Paint extends Product {
  @Field(() => [String], { nullable: true })
  readonly use: string[];
  @Field(() => [String], { nullable: true })
  readonly color: string[];
}