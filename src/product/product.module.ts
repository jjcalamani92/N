import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Paint, PaintSchema, Wear, WearSchema } from './entities';
import { PaintRepository, WearRepository } from './repository';
import { WearResolver, PaintResolver } from './resolver';
import { PaintService, WearService } from './service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Paint.name,
        schema: PaintSchema,
      },
      {
        name: Wear.name,
        schema: WearSchema,
      },
    ]),
  ],
  providers: [
    WearRepository,
    WearResolver,
    WearService,
    PaintRepository,
    PaintResolver,
    PaintService,
  ],
})
export class ProductModule {}
