import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Section } from '../entities';
import { PageService, SectionService } from '../service';
import { CreateSectionInput, UpdateSectionInput, GetSectionArgs } from '../dto';
import { ListInput } from 'src/common/dto';
import ConnectionArgs from 'src/common/relay/connection.args';
import { Page } from '../entities/page.model';

@Resolver(() => Section)
export class SectionResolver {
  constructor(
    private readonly sectionService: SectionService,
    private readonly pageService: PageService,
  ) {}
  @Mutation(() => Section)
  createSection(@Args('input') input: CreateSectionInput) {
    return this.sectionService.createSection(input);
  }

  @Mutation(() => Section)
  updateSection(@Args('input') input: UpdateSectionInput) {
    return this.sectionService.updateSection(input._id, input);
  }

  @Mutation(() => Section)
  removeSection(@Args('input') input: UpdateSectionInput) {
    return this.sectionService.removeSection(input._id);
  }

  @Query(() => Section, { name: 'section' })
  async getSection(@Args() getSectionArgs: GetSectionArgs) {
    return this.sectionService.getSection(getSectionArgs);
  }

  @Query(() => [Section], { name: 'sections' })
  async getSections(
    @Args('input')
    listInput: ListInput,
  ) {
    return this.sectionService.getSections(listInput);
  }

  // @ResolveField(() => Page)
  // async page(@Parent() section: Section) {
  //   return this.pageService.getPageById(section.page);
  // }

  // @Query(() => ListSectionResponse, {
  //   name: 'listSectionWithCursor',
  // })
  // async findAllUserWithCursor(
  //   @Args('args') args: ConnectionArgs,
  // ): Promise<ListSectionResponse> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { users, count } = await this.userService.getAll({
  //     limit,
  //     offset,
  //   });
  //   const page = connectionFromArraySlice(users, args, {
  //     arrayLength: count,
  //     sliceStart: offset || 0,
  //   });

  //   return { pageData: { count, limit, offset }, page };
  // }
}
