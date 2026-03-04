import { Body, Controller, Post, Get, Req, UseGuards, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { Admin } from '../common/decorators/admin.decorator';
import { Auth } from '../common/decorators/auth.decorator';
import { AUTH_ROUTES } from './auth.routes';
// import { Google } from '../common/decorators/google.decorator';
// import { Facebook } from '../common/decorators/facebook.decorator';


@Controller(AUTH_ROUTES.ROOT)
export class AuthController {
  constructor(private authService: AuthService) {}

  // PUBLIC
  @Post(AUTH_ROUTES.PUBLIC.REGISTER)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post(AUTH_ROUTES.PUBLIC.LOGIN)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post(AUTH_ROUTES.PUBLIC.REFRESH)
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  // PRIVATE
  @Auth()
  @Get(AUTH_ROUTES.PRIVATE.ME)
  me(@Req() req) {
    return req.user;
  }

  @Auth()
  @Post(AUTH_ROUTES.PRIVATE.LOGOUT)
  logout(@Req() req) {
    return this.authService.logout(req.user.sub);
  }

  // @Get(AUTH_ROUTES.PUBLIC.GOOGLE)
  // @Google()
  // googleAuth() {}

  // @Get(AUTH_ROUTES.PUBLIC.GOOGLE_CALLBACK)
  // @Google()
  // async googleCallback(@Req() req) {
  //   return this.authService.socialLogin(req.user);
  // }

  // @Get(AUTH_ROUTES.PUBLIC.FACEBOOK)
  // @Facebook()
  // facebookAuth() {}

  // @Get(AUTH_ROUTES.PUBLIC.FACEBOOK_CALLBACK)
  // @Facebook()
  // async facebookCallback(@Req() req) {
  //   return this.authService.socialLogin(req.user);
  // }

  // ADMIN
  @Post(AUTH_ROUTES.ADMIN.REGISTER)
  registerAdmin(@Body() dto: RegisterAdminDto) {
    return this.authService.registerAdmin(dto);
  }
}
