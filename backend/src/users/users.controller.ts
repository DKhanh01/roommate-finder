import { Controller, Patch, Body, UseGuards, Req, UseInterceptors, BadRequestException, UploadedFile, Get, Param } from '@nestjs/common';
import { Auth } from '../common/decorators/auth.decorator';
import { UserService } from './users.service';
import {USER_ROUTES} from './user.routes';

@Controller(USER_ROUTES.ROOT)
export class UserController {
  constructor(private service: UserService) {}

  
  @Auth()
  @Get(USER_ROUTES.PRIVATE.PROFILE)
  getMyProfile(@Req() req) {
  return this.service.getMyProfile(req.user.sub);
  }

  @Auth()
  @Patch(USER_ROUTES.PRIVATE.UPDATE_PROFILE)
  update(@Req() req, @Body() dto) {
    return this.service.updateProfile(req.user.sub, dto);
  }

  @Get(USER_ROUTES.PUBLIC.GET_USER)
  getOne(@Param('id') id: string) {
    return this.service.getOneUser(Number(id));
  }

  // @Auth()
  // @Patch(USER_ROUTES.PRIVATE.AVATAR)
  // @UseInterceptors(
  // FileInterceptor('file', {
  //   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  //   fileFilter: (req, file, cb) => {
  //     if (!file.mimetype.startsWith('image/')) {
  //       cb(new BadRequestException('Only image allowed'), false);
  //     }
  //     cb(null, true);
  //     },
  //   }),
  // )
  // uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req) {
  //   return this.service.updateAvatar(req.user.sub, file);
  // }
}
