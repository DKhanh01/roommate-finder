import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function Facebook() {
  return applyDecorators(
    UseGuards(AuthGuard('facebook')),
  );
}