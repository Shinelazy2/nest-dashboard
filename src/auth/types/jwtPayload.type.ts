import { RoleType } from './roles.enum';

export type JwtPayload = {
  loginId: string;
  sub: number;
  role: RoleType;
};
