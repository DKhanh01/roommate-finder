import { Controller, Get, Query, Req } from "@nestjs/common";
import { RoommateService } from "./roommate.service";
import { RoommateQueryDto } from "./dto/roommate.dto";
import { Auth } from "../common/decorators/auth.decorator";

@Controller("roommates")
export class RoommateController {
  constructor(private readonly roommateService: RoommateService) {}

  @Auth()
  @Get()
  findAll(@Query() query: RoommateQueryDto,
  @Req() req) {
    return this.roommateService.findAll(query, req.user.sub);
  }
}