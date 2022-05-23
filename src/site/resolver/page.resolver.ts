import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Page } from '../entities/page.model';
import { PageService } from '../service/page.service';
import { CreatePageInput, UpdatePageInput, GetPageArgs } from '../dto';
import { ListInput } from '../../common/dto/list.input';
import { SectionService } from '../service/section.service';
import { Section } from '../entities/section.model';
import { CreateSectionInput } from '../dto/create-section.input';

@Resolver(() => Page)
export class PageResolver {
  constructor(
    private readonly pageService: PageService,
    private readonly sectionService: SectionService,
  ) {}
  @Mutation(() => Page)
  createPage(@Args('input') input: CreatePageInput) {
    return this.pageService.createPage(input);
  }

  @Mutation(() => Page)
  updatePage(@Args('input') input: UpdatePageInput) {
    return this.pageService.updatePage(input._id, input);
  }

  @Mutation(() => Page)
  removePage(@Args('input') input: UpdatePageInput) {
    return this.pageService.removePage(input._id);
  }

  @Query(() => Page, { name: 'page' })
  async getPage(@Args() getPageArgs: GetPageArgs) {
    return this.pageService.getPage(getPageArgs);
  }

  @Query(() => [Page], { name: 'pages' })
  async getPages(
    @Args('input')
    listInput: ListInput,
  ) {
    return this.pageService.getSections(listInput);
  }

  @ResolveField()
  async sections(@Parent() page: Page) {
    return this.sectionService.findByPageId(page._id);
  }

  @Mutation(() => Page)
  addSection(@Args('input') input: CreateSectionInput) {
    return this.pageService.addSection(input._id, input);
  }
}
