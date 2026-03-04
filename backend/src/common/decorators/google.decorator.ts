import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function Google() {
  return applyDecorators(
    UseGuards(AuthGuard('google')),
  );
}