import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Page,
  PageSchema,
  Section,
  SectionSchema,
  Site,
  SiteSchema,
} from './entities';
import {
  PageRepository,
  SectionRepository,
  SiteRepository,
} from './repository';
import { SiteResolver, PageResolver, SectionResolver } from './resolver';
import { SiteService, PageService, SectionService } from './service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Site.name,
        schema: SiteSchema,
      },
      {
        name: Page.name,
        schema: PageSchema,
      },
      {
        name: Section.name,
        schema: SectionSchema,
      },
    ]),
  ],
  providers: [
    SiteRepository,
    SiteResolver,
    SiteService,
    PageRepository,
    PageResolver,
    PageService,
    SectionRepository,
    SectionResolver,
    SectionService,
  ],
  exports: [SiteRepository],
})
export class SiteModule {}
