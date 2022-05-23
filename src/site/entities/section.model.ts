import { Field, ObjectType } from '@nestjs/graphql';
import { Page } from './page.model';
import { AbstractModel } from '../../common/abstract/abstract.model';
import { User } from '../../user/entities/user.model';

@ObjectType()
export class Section extends AbstractModel {
  @Field()
  readonly title: string;
  @Field()
  readonly href: string;
  @Field()
  readonly description: string;
  @Field()
  readonly image: string;
  // @Field(() => Page)
  // readonly page: Page | string;
  @Field(() => User)
  readonly user: User | string;
  @Field()
  readonly status: boolean;
}
