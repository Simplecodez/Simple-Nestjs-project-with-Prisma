import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      omit: {
        user: {
          password: true,
        },
      },
    });

    this.$extends({
      name: 'User',
      query: {
        user: {
          async create({ args, query }) {
            args.data['password'] = await bcrypt.hash(
              args.data['password'],
              10,
            );
            return query(args);
          },
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
