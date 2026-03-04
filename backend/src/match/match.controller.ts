import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { Auth } from '../common/decorators/auth.decorator';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

    @Auth()
    @Get('recommend')
    recommend(@Req() req) {
        return this.matchService.recommend(req.user.sub);
    }
}
