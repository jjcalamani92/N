import { Field, InputType, PartialType, ID, ArgsType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { ProductInput, GetProductArgs } from './product.input';

@InputType()
export class CreatePaintInput extends ProductInput {
  @Field(() => [String], { nullable: true })
  use: string[];
  @Field(() => [String], { nullable: true })
  color: string[];
}

@InputType()
export class UpdatePaintInput extends PartialType(CreatePaintInput) {
  @Field(() => ID)
  @IsMongoId()
  readonly _id: string;
}

@ArgsType()
export class GetPaintArgs extends GetProductArgs {}
