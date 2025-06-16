import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class Auth {
  @Field()
  id: number;

  @IsEmail()
  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  accessToken: string;
}