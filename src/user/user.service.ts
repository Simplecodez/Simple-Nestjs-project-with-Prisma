import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly dataService: DatabaseService) {}

  // Creates a new user record in the database using the provided input.
  async createUser(createUserInput: Prisma.UserCreateInput) {
    return this.dataService.user.create({ data: createUserInput });
  }

  // Finds a user where the condition on the unique fields is matched.
  async findUniqueUserWhere(condition: Prisma.UserWhereUniqueInput) {
    return this.dataService.user.findUnique({
      where: condition,
      select: { password: true, email: true, id: true },
    });
  }

  // Finds a user where the condition on the fields is matched.
  async findUserWhere(condition: { [K in keyof User]?: string }) {
    return this.dataService.user.findFirst({
      where: condition,
    });
  }

  // Updates a user's record where the condition is matched.
  async updateUser(
    condition: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    return this.dataService.user.update({ where: condition, data });
  }
}
