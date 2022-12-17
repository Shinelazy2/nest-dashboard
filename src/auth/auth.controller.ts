import { TypeormResult } from './types/typeormResult.type';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthDto } from './dtos';
import { Tokens } from './types';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';
import { SendResult } from './types/updateResult.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/join')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<SendResult> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string) {
    console.log('🚀 ~ file: auth.controller.ts ~ line 37 ~ AuthController ~ refreshTokens ~ userId', userId);
    console.log('🚀 ~ file: auth.controller.ts ~ line 37 ~ AuthController ~ refreshTokens ~ refreshToken', refreshToken);
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post('/test')
  test() {
    return 'TEST';
  }
}
