
import { applyDecorators } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Role } from 'src/role.enum';
import { AuthGuard } from 'src/auth/authGuard';
import { RolesGuard } from 'src/guards/roles.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}