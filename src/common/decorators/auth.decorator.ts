import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
