import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput, GetUserArgs } from './dto';
import { UserService } from './user.service';
import { User } from './entities/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  
  // @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  // @UseGuards(GqlAuthGuard)
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
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(GqlAuthGuard)
  async getUsers() {
    return this.userService.findAll();
  }
}
