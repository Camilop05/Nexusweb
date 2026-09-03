import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { AuthenticatedUser } from './types/authenticated-user.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Público: permite crear cuenta sin estar autenticado.
  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // Público, pero protegido por LocalAuthGuard (valida email/password antes de ejecutar).
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() _dto: LoginDto, @CurrentUser() user: AuthenticatedUser) {
    // _dto existe para que ValidationPipe valide el body, aunque usamos user desde @CurrentUser().
    return this.authService.login(user);
  }

  // Público: no necesita access token, pero sí un refresh token válido.
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  // Protegido por JwtAuthGuard global. Necesita Authorization: Bearer accessToken.
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@CurrentUser() user: AuthenticatedUser) {
    return this.authService.logout(user);
  }

  // Protegido. Devuelve el usuario que viene dentro del access token.
  @Get('me')
  me(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }
}