import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';

@ObjectType()
export class User extends AbstractModel {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;

  @Field(() => [String])
  sites: string[];

  @Field(() => Boolean)
  status: boolean;

  @Field(() => Boolean)
  google: boolean;
}
