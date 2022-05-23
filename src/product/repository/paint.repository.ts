import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Paint, PaintDocument } from '../entities';

@Injectable()
export class PaintRepository extends AbstractRepository<PaintDocument> {
  protected readonly logger = new Logger(PaintDocument.name);

  constructor(@InjectModel(Paint.name) paintModel: Model<PaintDocument>) {
    super(paintModel);
  }
}
