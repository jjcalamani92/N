import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Page, PageDocument } from '../entities';

@Injectable()
export class PageRepository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(PageDocument.name);

  constructor(@InjectModel(Page.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}
