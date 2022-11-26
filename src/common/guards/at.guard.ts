import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()]);
    console.log('🚀 ~ file: at.guard.ts ~ line 13 ~ AtGuard ~ canActivate ~ isPublic', isPublic);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
