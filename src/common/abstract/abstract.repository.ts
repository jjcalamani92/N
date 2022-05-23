import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { ListInput } from '../dto';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument> | string,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findByIdAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });
    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async remove(filterQuery: FilterQuery<TDocument> | string) {
    return this.model.findByIdAndUpdate(
      filterQuery,
      { status: false },
      { lean: true, new: true },
    );
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });
    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  findAll(paginationQuery: ListInput) {
    const { limit, offset } = paginationQuery;
    return this.model.find({ status: true }).skip(offset).limit(limit).exec();
  }

  async All(paginationQuery: ListInput) {
    const count = await this.model.count({ status: true });
    const data = await this.findAll(paginationQuery);
    return { count, data };
  }
}
