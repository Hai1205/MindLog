import { Injectable } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'src/utils/service/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) { }

  findAll(skip: number = 0, take: number = DEFAULT_PAGE_SIZE) {
    return this.prisma.tag.findMany({
      skip: skip,
      take: take,
    });
  }
}
