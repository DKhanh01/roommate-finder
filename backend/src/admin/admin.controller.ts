import {
  Controller,
  Get,
  Delete,
  Param,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { Auth } from '../common/decorators/auth.decorator';
import { Admin } from '../common/decorators/admin.decorator';
import { ParseIntPipe } from '@nestjs/common';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Get('admins')
  getAdmins() {
    return this.adminService.getAdmins();
  } 

  @Delete(':id')
  @Auth()
  @Admin()
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    return this.adminService.deleteUser(id, req.user.sub);
  }

  @Get('rooms')
  getRooms() {
    return this.adminService.getRooms();
  }

  @Patch('rooms/:id/toggle')
  toggleRoom(@Param('id') id: string) {
    return this.adminService.toggleRoom(+id);
  }

  @Delete('rooms/:id')
  deleteRoom(@Param('id') id: string) {
    return this.adminService.deleteRoom(+id);
  }
}