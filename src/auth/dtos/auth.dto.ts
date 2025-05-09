import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  access_token: string;

  @Field(() => String)
  id: string;
}
