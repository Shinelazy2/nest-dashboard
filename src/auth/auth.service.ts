import { SendResult } from './types/updateResult.type';
import { TypeormResult } from './types/typeormResult.type';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthDto): Promise<Tokens> {
    dto.hash = await this.hashData(dto.password);
    console.log(dto);

    const signUser = await this.usersRepository.save(dto);
    const tokens = await this.getTokens(signUser.id, signUser.email);
    await this.updateRtHash(signUser.id, tokens.refresh_token);
    return tokens;
  }

  async signIn(dto: AuthDto): Promise<Tokens> {
    const user = await this.dataSource
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email: dto.email })
      .getOne();
    console.log('user : ', user);
    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number): Promise<SendResult> {
    const isUpdate: TypeormResult = await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ hashedRt: null })
      .where('id = :id', { id: userId })
      .execute();
    if (!isUpdate.affected)
      return {
        isUpdate: false,
        message: '로그인 실패',
      };
    else
      return {
        isUpdate: true,
        message: '로그아웃 성공',
      };
  }

  hashData(data: string) {
    console.log('hashdata : ', data);
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: 'at-secret',
        expiresIn: '10s',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: 'rt-secret',
        expiresIn: '7d',
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.dataSource.createQueryBuilder().update(User).set({ hashedRt: hash }).where('id = :id', { id: userId }).execute();
  }

  async refreshTokens(userId: number, rt: string) {
    //
    const user = await this.usersRepository.findOneBy({ id: userId });
    console.log('🚀 ~ file: auth.service.ts ~ line 113 ~ AuthService ~ refreshTokens ~ user', user);

    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
}
