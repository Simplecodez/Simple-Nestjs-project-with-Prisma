import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * Fetches the authenticated user's profile data.
   *
   * Uses the @Auth() guard to ensure the user is authenticated.
   * Retrieves the user data from the database based on the user's ID.
   */
  @Auth()
  @Query(() => User)
  profile(@GetUser() user: User) {
    return this.userService.findUniqueUserWhere({ id: user.id });
  }
}
