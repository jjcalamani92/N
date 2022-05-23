import { Field, InputType, PartialType, ID, ArgsType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ProductInput, GetProductArgs } from './product.input';

@InputType()
export class CreateWearInput extends ProductInput {
  @Field()
  color: string;
  @Field(() => [String], { nullable: true })
  sizes: string[];
}

@InputType()
export class UpdateWearInput extends PartialType(CreateWearInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  readonly _id: string;
}

@ArgsType()
export class GetWearArgs extends GetProductArgs {}
