import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput, GetUserArgs } from './dto';
import { UserService } from './user.service';
import { User } from './entities/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  
  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.userService.update(input._id, input);
  }

  @Mutation(() => User)
  removeUser(@Args('input') input: UpdateUserInput) {
    return this.userService.remove(input._id);
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args() getUserArgs: GetUserArgs) {
    return this.userService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return this.userService.findAll();
  }
}
