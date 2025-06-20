import { Injectable } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'src/utils/service/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) { }

  findAll(skip: number = 0, take: number = DEFAULT_PAGE_SIZE) {
    return this.prisma.like.findMany({
      skip: skip,
      take: take,
    });
  }

  async countPostLikes(postId: number) {
    return this.prisma.like.count({
      where: {
        postId,
      }
    });
  }

  async hasUserLikedPost(userId: number, postId: number) {
    const like = await this.prisma.like.findFirst({
      where: {
        userId,
        postId,
      }
    });
    return !!like;
  }

  async likePost(userId: number, postId: number) {
    // Kiểm tra xem người dùng đã thích bài viết chưa
    const existingLike = await this.prisma.like.findFirst({
      where: {
        userId,
        postId,
      }
    });

    // Nếu đã thích rồi thì không làm gì
    if (existingLike) {
      return true;
    }

    // Nếu chưa thích thì tạo like mới
    await this.prisma.like.create({
      data: {
        userId,
        postId,
      }
    });

    return true;
  }

  async unlikePost(userId: number, postId: number) {
    // Kiểm tra xem người dùng đã thích bài viết chưa
    const existingLike = await this.prisma.like.findFirst({
      where: {
        userId,
        postId,
      }
    });

    // Nếu chưa thích thì không làm gì
    if (!existingLike) {
      return true;
    }

    // Nếu đã thích thì xóa like
    await this.prisma.like.delete({
      where: {
        id: existingLike.id
      }
    });

    return true;
  }
}
