import { InputType, Field, PartialType, ID, ArgsType } from '@nestjs/graphql';
import { IsString, IsMongoId } from 'class-validator';
import { GetPageArgs } from './create-page.input';

@InputType()
export class CreateSiteInput {
  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  domain: string;

  @Field(() => String)
  @IsString()
  logo: string;

  @Field(() => String)
  @IsString()
  category: string;

  @Field({ nullable: true })
  status: boolean;
  // @Field(() => String)
  // @IsString()
  // user: string;
}

@InputType()
export class UpdateSiteInput extends PartialType(CreateSiteInput) {
  @Field(() => ID)
  @IsMongoId()
  readonly _id: string;
}
@ArgsType()
export class GetSiteArgs extends GetPageArgs {}
