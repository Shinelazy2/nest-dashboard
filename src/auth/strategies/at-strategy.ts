import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { RoleType } from '../types/roles.enum';

type JwtPayload = {
  sub: string;
  email: string;
  role: RoleType;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'at-secret',
      // ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload) {
    console.log('🚀 ~ file: at-strategy.ts:21 ~ AtStrategy ~ validate ~ payload', payload);
    return payload;
  }
}
