import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

export function Admin() {
  return applyDecorators(
    UseGuards(JwtAuthGuard, AdminGuard),
  );
}
