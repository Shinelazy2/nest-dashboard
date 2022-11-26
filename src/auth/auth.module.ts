import { User } from './../users/entity/user.entity';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  providers: [AuthService, AtStrategy, RtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
