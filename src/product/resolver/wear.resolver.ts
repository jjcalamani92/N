import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Wear } from '../entities/wear.model';
import { WearService } from '../service';
import { CreateWearInput, UpdateWearInput, GetWearArgs } from '../dto';

@Resolver(() => Wear)
export class WearResolver {
  constructor(private readonly wearService: WearService) {}
  @Mutation(() => Wear)
  createWear(@Args('input') input: CreateWearInput) {
    return this.wearService.createWear(input);
  }

  @Mutation(() => Wear)
  updateWear(@Args('input') input: UpdateWearInput) {
    return this.wearService.update(input._id, input);
  }

  @Mutation(() => Wear)
  removeWear(@Args('input') input: UpdateWearInput) {
    return this.wearService.remove(input._id);
  }

  @Query(() => Wear, { name: 'wear' })
  async getWear(@Args() getWearArgs: GetWearArgs) {
    return this.wearService.getWear(getWearArgs);
  }

  @Query(() => [Wear], { name: 'wears' })
  async getWears() {
    return this.wearService.findAll();
  }
}
