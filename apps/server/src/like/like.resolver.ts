import { Resolver, Query } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Query(() => [Like], { name: 'like' })
  findAll() {
    return this.likeService.findAll();
  }
}
