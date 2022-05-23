import { InputType, Field, PartialType, ID, ArgsType } from '@nestjs/graphql';
import { IsMongoId, IsString, IsNotEmpty } from 'class-validator';
import { Section } from '../entities';

@InputType()
export class CreatePageInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  href: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  image: string;

  // @Field()
  sections: Section[];

  @Field(() => [String])
  keywords: string[];

  status: boolean;
}

@InputType()
export class UpdatePageInput extends PartialType(CreatePageInput) {
  @Field(() => ID)
  @IsMongoId()
  readonly _id: string;
}

@ArgsType()
export class GetPageArgs {
  @Field()
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  _id: string;
}
