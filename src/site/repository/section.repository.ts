import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../common/abstract/abstract.repository';
import { Section, SectionDocument } from '../entities';

@Injectable()
export class SectionRepository extends AbstractRepository<SectionDocument> {
  protected readonly logger = new Logger(SectionDocument.name);

  constructor(@InjectModel(Section.name) sectionModel: Model<SectionDocument>) {
    super(sectionModel);
  }
}
