import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from './product.model';

@ObjectType()
export class Wear extends Product {
  @Field()
  readonly color: string;
  @Field(() => [String], { nullable: true })
  readonly sizes: string[];
}