import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from 'src/user/dto/create-user.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Auth)
  register(@Args('registerInput') registerInput: CreateUserInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => Auth)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }
}
