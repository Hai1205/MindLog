import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) { }

  async validateLocalUser({ email, password }: LoginInput) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new UnauthorizedException('User Not Found');

    if (!user.password) throw new UnauthorizedException('User has no password set');

    if (!user.password.startsWith('$')) {
      throw new UnauthorizedException('Invalid password format');
    }

    try {
      const isPasswordMatched = await verify(user.password, password);
      if (!isPasswordMatched) {
        throw new UnauthorizedException('Invalid Credentials!');
      }
      return user;
    } catch {
      throw new UnauthorizedException('Invalid Credentials!');
    }
  }

  async generateToken(userId: number) {
    const payload: IAuthJwtPayload = { userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async login(loginInput: LoginInput | any) {
    let user;

    // Nếu đây là dữ liệu người dùng từ Google OAuth
    if (loginInput.id) {
      user = loginInput;
    } else {
      // Nếu đây là đăng nhập thông thường
      user = await this.validateLocalUser(loginInput);
    }

    const { accessToken } = await this.generateToken(user.id);

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      accessToken,
    };
  }

  async register(registerInput: CreateUserInput) {
    return await this.userService.create(registerInput);
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (!user) throw new UnauthorizedException('User not found!');

    return user;
  }

  async validateGoogleUser(googleUser: CreateUserInput) {
    const user = await this.userService.findUserByEmail(googleUser.email);

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...authUser } = user;

      return authUser;
    }

    const dbUser = await this.prisma.user.create({
      data: { ...googleUser },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...authUser } = dbUser;

    return authUser;
  }
}