import { Resolver, Query, Args, Int  } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Query(() => [Like], { name: 'likes' })
  findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ) {
    return this.likeService.findAll(skip, take);
  }
}
