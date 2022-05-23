import { Injectable } from '@nestjs/common';
import { CreateSiteInput, GetSiteArgs, UpdateSiteInput } from '../dto';
import { Site, SiteDocument } from '../entities';
import { SiteRepository } from '../repository';
import { ListInput } from '../../common/dto/list.input';

@Injectable()
export class SiteService {
  constructor(private readonly siteRepository: SiteRepository) {}
  async createSite(input: CreateSiteInput) {
    const dataDocument = await this.siteRepository.create(input);
    return this.toModel(dataDocument);
  }

  async updateSite(id: string, input: UpdateSiteInput) {
    const dataDocument = await this.siteRepository.findOneAndUpdate(id, input);
    return this.toModel(dataDocument);
  }
  
  async removeSite(id: string) {
    const dataDocument = await this.siteRepository.remove(id);
    return this.toModel(dataDocument);
  }

  async getSite(getsiteArgs: GetSiteArgs) {
    const dataDocument = await this.siteRepository.findOne(getsiteArgs);
    return this.toModel(dataDocument);
  }
  
  getSites(paginationQuery: ListInput) {
    return this.siteRepository.findAll(paginationQuery);
  }

  private toModel(siteDocument: SiteDocument): Site {
    return {
      _id: siteDocument._id.toHexString(),
      title: siteDocument.title,
      domain: siteDocument.domain,
      logo: siteDocument.logo,
      category: siteDocument.category,
      // user: siteDocument.user,
      status: siteDocument.status,
    };
  }
}
