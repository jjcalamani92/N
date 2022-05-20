import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ListUserResponse, User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ListInput } from '../common/dto/list.input';
import ConnectionArgs, { getPagingParameters } from 'src/common/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.userService.update(input._id, input);
  }

  @Mutation(() => User)
  removeUser(@Args('input') input: UpdateUserInput) {
    return this.userService.remove(input._id, input);
  }

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args('listInput')
    listInput: ListInput,
  ) {
    return this.userService.findAll(listInput);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('_id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  } 

  @Query(() => ListUserResponse, {
    name: 'listUserWithCursor',
  })
  async findAllUserWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListUserResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { users, count } = await this.userService.getAll({
      limit,
      offset,
    });
    const page = connectionFromArraySlice(users, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { pageData: { count, limit, offset }, page };
  }

}
