import { Injectable } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
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
}
