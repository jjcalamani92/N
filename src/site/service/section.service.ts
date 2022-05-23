import { Injectable } from '@nestjs/common';
import { ListInput } from 'src/common/dto';
import { CreateSectionInput, UpdateSectionInput, GetSectionArgs } from '../dto';
import { Section, SectionDocument } from '../entities';
import { SectionRepository } from '../repository';

@Injectable()
export class SectionService {
  constructor(private readonly sectionRepository: SectionRepository) {}

  async createSection(input: CreateSectionInput) {
    const dataDocument = await this.sectionRepository.create(input);
    return this.toModel(dataDocument);
  }

  async updateSection(id: string, input: UpdateSectionInput) {
    const dataDocument = await this.sectionRepository.findOneAndUpdate(
      id,
      input,
    );
    return this.toModel(dataDocument);
  }

  async removeSection(id: string) {
    const dataDocument = await this.sectionRepository.remove(id);
    return this.toModel(dataDocument);
  }

  async getSection(getsectionArgs: GetSectionArgs) {
    const dataDocument = await this.sectionRepository.findOne(getsectionArgs);
    return this.toModel(dataDocument);
  }

  async findByPageId(id) {
    const dataDocument = await this.sectionRepository.findOne({ page: id });
    return this.toModel(dataDocument);
  }

  getSections(paginationQuery: ListInput) {
    return this.sectionRepository.findAll(paginationQuery);
  }

  getAll(paginationQuery: ListInput) {
    return this.sectionRepository.All(paginationQuery);
  }

  private toModel(sectionDocument: SectionDocument): Section {
    return {
      _id: sectionDocument._id.toHexString(),
      title: sectionDocument.title,
      href: sectionDocument.href,
      description: sectionDocument.description,
      image: sectionDocument.image,
      status: sectionDocument.status,
      // page: sectionDocument.page,
      user: sectionDocument.user,
    };
  }
}
