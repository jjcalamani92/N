import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract/abstract.model';

@ObjectType()
export class Site extends AbstractModel {
  @Field()
  readonly title: string;
  @Field()
  readonly domain: string;
  @Field()
  readonly logo: string;
  @Field()
  readonly category: string;
  // @Field()
  // readonly user: User;
  @Field()
  readonly status: boolean;
}
