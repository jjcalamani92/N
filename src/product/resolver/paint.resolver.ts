import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Paint } from '../entities/paint.model';
import { PaintService } from '../service';
import { CreatePaintInput, UpdatePaintInput, GetPaintArgs } from '../dto';

@Resolver(() => Paint)
export class PaintResolver {
  constructor(private readonly paintService: PaintService) {}
  @Mutation(() => Paint)
  createPaint(@Args('input') input: CreatePaintInput) {
    return this.paintService.createPaint(input);
  }

  @Mutation(() => Paint)
  updatePaint(@Args('input') input: UpdatePaintInput) {
    return this.paintService.update(input._id, input);
  }

  @Mutation(() => Paint)
  removePaint(@Args('input') input: UpdatePaintInput) {
    return this.paintService.remove(input._id);
  }

  @Query(() => Paint, { name: 'paint' })
  async getPaint(@Args() getPaintArgs: GetPaintArgs) {
    return this.paintService.getPaint(getPaintArgs);
  }

  @Query(() => [Paint], { name: 'paints' })
  async getPaints() {
    return this.paintService.findAll();
  }
}
