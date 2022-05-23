import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetUserArgs {
  @Field()
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
