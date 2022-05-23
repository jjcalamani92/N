import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Wear, WearDocument } from '../entities';

@Injectable()
export class WearRepository extends AbstractRepository<WearDocument> {
  protected readonly logger = new Logger(WearDocument.name);
  
  constructor(@InjectModel(Wear.name) wearModel: Model<WearDocument>) {
    super(wearModel);
  }
}
