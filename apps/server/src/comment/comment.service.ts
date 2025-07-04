import { Injectable } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'src/utils/service/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) { }

  findAll(skip: number = 0, take: number = DEFAULT_PAGE_SIZE) {
    return this.prisma.comment.findMany({
      skip: skip,
      take: take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOneByPost({
    postId,
    take,
    skip,
  }: {
    postId: number;
    take?: number;
    skip?: number;
  }) {
    return await this.prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: skip ?? 0,
      take: take ?? DEFAULT_PAGE_SIZE,
    });
  }

  async count(postId: number) {
    return await this.prisma.comment.count({
      where: {
        postId,
      },
    });
  }

  async create(createCommentInput: CreateCommentInput, authorId: number) {
    return await this.prisma.comment.create({
      data: {
        content: createCommentInput.content,
        post: {
          connect: {
            id: createCommentInput.postId,
          },
        },
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  }
}
