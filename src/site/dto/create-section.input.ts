import { ArgsType, Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Page } from '../entities';
import { CreatePageInput, GetPageArgs } from './create-page.input';
import { IsString } from 'class-validator';

@InputType()
export class CreateSectionInput {
  @Field(() => ID)
  _id: string;

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
  status: boolean;

  // @Field()
  // page: string;

  @Field()
  user: string;
}

@InputType()
export class UpdateSectionInput extends PartialType(CreateSectionInput) {
  @Field(() => ID)
  readonly _id: string;
}

@ArgsType()
export class GetSectionArgs extends GetPageArgs {}
