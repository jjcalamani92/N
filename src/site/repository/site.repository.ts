import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Site, SiteDocument } from '../entities';

@Injectable()
export class SiteRepository extends AbstractRepository<SiteDocument> {
  protected readonly logger = new Logger(SiteDocument.name);

  constructor(@InjectModel(Site.name) siteModel: Model<SiteDocument>) {
    super(siteModel);
  }
}
