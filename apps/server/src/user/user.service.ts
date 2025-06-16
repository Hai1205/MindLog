import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserInput: CreateUserInput) {
    const user = await this.findOne(createUserInput.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    
    const { password, ...userData } = createUserInput;

    return this.prisma.user.create({
      data: {
        ...userData,
        password: await hash(password),
      },
    });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(userId: number) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
