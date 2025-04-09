import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = GqlExecutionContext.create(ctx).getContext()?.req;
    const user = req?.user;
    return data ? user?.[data] : user;
  },
);
