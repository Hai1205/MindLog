import { Resolver, Query } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [Tag], { name: 'tag' })
  findAll() {
    return this.tagService.findAll();
  }
}
