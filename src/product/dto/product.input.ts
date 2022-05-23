import { ArgsType, Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

@InputType()
export class ProductInput {
  @Field()
  title: string;
  @Field()
  brand: string;
  @Field()
  description: string;
  @Field(() => [String])
  image: string[];
  @Field()
  inStock: number;
  @Field({ nullable: true })
  slug: string;
  @Field()
  category: string;
  @Field()
  subCategory: string;
  @Field()
  price: number;
  @Field(() => [String], { nullable: true })
  tags: string[];
  @Field({ nullable: true })
  status: boolean;
}

@InputType()
export class UpdateProductInput extends PartialType(ProductInput) {
  @Field(() => ID)
  @IsMongoId()
  readonly _id: string;
}

@ArgsType()
export class GetProductArgs {
  @Field()
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
