import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @Field()
  @IsString()
  @MinLength(8, { message: 'Password has be at least 8 characters long' })
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;,.<>?/~`]).+$/,
    {
      message:
        'Password must contain at least one of A-Z, a-z, 0-9 and one special character.',
    },
  )
  password: string;
}
