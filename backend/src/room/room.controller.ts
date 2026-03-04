import { Controller, Post, Get, Body, UseGuards, Req, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { RoomService } from './room.service';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Admin } from '../common/decorators/admin.decorator';
import { Auth } from '../common/decorators/auth.decorator';
import { ROOM_ROUTES } from './room.routes';
import { CreateRoomDto } from './dto/create-room.dto';


@Controller(ROOM_ROUTES.ROOT)
export class RoomController {
  constructor(private service: RoomService) {}

  // PUBLIC
  @Get()
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }


  @Get(ROOM_ROUTES.PUBLIC.DETAIL)
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // PRIVATE
  @Auth()
  @Post(ROOM_ROUTES.PRIVATE.CREATE)
  create(@Req() req, @Body() dto: CreateRoomDto) {
    return this.service.create(req.user.sub, dto);
  }

  @Auth()
  @Get(ROOM_ROUTES.PRIVATE.MY_ROOMS)
  getMyRooms(
    @Req() req,
    @Query('includeInactive') includeInactive?: string,
  ) {
    return this.service.getByUser(req.user.sub, {
      includeInactive: includeInactive?.toLowerCase().trim() === 'true',
    });
  }

  @Auth()
  @Get(ROOM_ROUTES.PRIVATE.MY_INACTIVE_ROOMS)
    getMyInactiveRooms(@Req() req) {
    return this.service.getInactiveByUser(req.user.sub);
  }

  @Auth()
  @Get(ROOM_ROUTES.PRIVATE.INACTIVE_DETAIL)
    getMyInactiveRoomDetail(
      @Req() req,
      @Param('id', ParseIntPipe) id: number) {
    return this.service.findOnedelete(id);
  }

  @Auth()
  @Get(ROOM_ROUTES.PRIVATE.MY_ROOMS_IS_RENTING)
    getMyRoomsIsRenting(@Req() req) {
    return this.service.getRentingByUser(req.user.sub);
  }

  @Auth()
  @Patch(ROOM_ROUTES.PRIVATE.UPDATE)
  update(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoomDto,
  ) {
    return this.service.update(id, req.user.sub, dto);
  }

  @Auth()
  @Delete(ROOM_ROUTES.PRIVATE.DELETE)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ) {
    return this.service.remove(id, req.user.sub);
  }

  @Auth()
  @Patch(ROOM_ROUTES.PRIVATE.RESTORE)
  restore(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ) {
    return this.service.restore(id, req.user.sub);
  }

  // ADMIN
  @Admin()
  @Delete(ROOM_ROUTES.ADMIN.DELETE)
  delete(
    @Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }

  @Admin()
  @Get(ROOM_ROUTES.ADMIN.ROOM_BY_USER)
  getRoomsByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.getByUser(userId, {
      includeInactive: true,
    });
  }

  @Admin()
  @Get(ROOM_ROUTES.ADMIN.USER_ACTIVE)
  getActiveRoomsByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.getByUser(userId);
  }

  @Admin()
  @Get(ROOM_ROUTES.ADMIN.ALL_INACTIVE)
  getAllInactiveRooms() {
  return this.service.admingetAllInactive();
  }  

  @Admin()
  @Get(ROOM_ROUTES.ADMIN.USER_INACTIVE)
  getInactiveRoomsByUser(@Param('userId', ParseIntPipe) userId: number) {
  return this.service.admingetInactiveRoomsByUser(userId);
  }

  @Admin()
  @Get(ROOM_ROUTES.ADMIN.ALL_RENTED)
  getAllRentedRooms() {
  return this.service.admingetAllRented();
  }

  @Admin()
  @Get(ROOM_ROUTES.ADMIN.USER_ROOMS_IS_RENTING)
  getRoomsIsRentingByUser(@Param('userId', ParseIntPipe) userId: number) {
  return this.service.getRentingByUser(userId);
  }
}
