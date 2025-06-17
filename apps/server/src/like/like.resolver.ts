import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) { }

  @Query(() => [Like], { name: 'likes' })
  findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ) {
    return this.likeService.findAll(skip, take);
  }

  @Query(() => Int, { name: 'postLikesCount' })
  getPostLikesCount(
    @Args('postId', { type: () => Int }) postId: number
  ) {
    return this.likeService.countPostLikes(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean, { name: 'userLikedPost' })
  hasUserLikedPost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number
  ) {
    const userId = context.req.user.id;
    
    return this.likeService.hasUserLikedPost(userId, postId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  likePost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number
  ) {
    const userId = context.req.user.id;

    return this.likeService.likePost(userId, postId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  unlikePost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number
  ) {
    const userId = context.req.user.id;

    return this.likeService.unlikePost(userId, postId);
  }
}
