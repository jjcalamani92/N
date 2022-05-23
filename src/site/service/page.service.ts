import { Injectable } from '@nestjs/common';
import { CreatePageInput, GetPageArgs, UpdatePageInput } from '../dto';
import { Page, PageDocument } from '../entities';
import { PageRepository, SectionRepository } from '../repository';
import { ListInput } from '../../common/dto/list.input';
import { Parent, ResolveField } from '@nestjs/graphql';
import { Section } from '../entities/section.model';
import { SectionService } from './section.service';

@Injectable()
export class PageService {
  constructor(private readonly pageRepository: PageRepository) {}
  async createPage(input: CreatePageInput) {
    const dataDocument = await this.pageRepository.create(input);
    return this.toModel(dataDocument);
  }

  async updatePage(id: string, input: UpdatePageInput) {
    const dataDocument = await this.pageRepository.findOneAndUpdate(id, input);
    return this.toModel(dataDocument);
  }

  async removePage(id: string) {
    const dataDocument = await this.pageRepository.remove(id);
    return this.toModel(dataDocument);
  }

  async getPage(getpageArgs: GetPageArgs) {
    const dataDocument = await this.pageRepository.findOne(getpageArgs);
    return this.toModel(dataDocument);
  }
  async getPageById(id) {
    const dataDocument = await this.pageRepository.findOne(id);
    return this.toModel(dataDocument);
  }

  getSections(paginationQuery: ListInput) {
    return this.pageRepository.findAll(paginationQuery);
  }

  getAll(paginationQuery: ListInput) {
    return this.pageRepository.All(paginationQuery);
  }

  async addSection(id: string, section: Section) {
    const page: PageDocument = await this.pageRepository.findOneAndUpdate(id, {
      $push: {
        sections: section,
      },
    });
    return page;
  }

  private toModel(pageDocument: PageDocument): Page {
    return {
      _id: pageDocument._id.toHexString(),
      title: pageDocument.title,
      href: pageDocument.href,
      description: pageDocument.description,
      image: pageDocument.image,
      status: pageDocument.status,
      sections: pageDocument.sections,
      keywords: pageDocument.keywords,
    };
  }
}
