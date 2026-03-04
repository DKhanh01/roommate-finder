import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import { NormalizeImagesMiddleware } from './common/middleware/normalize-images.middleware';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { AdminModule } from './admin/admin.module';
import { MatchModule } from './match/match.module';
import { RoommateModule } from './roommate/roommate.module';

@Module({
  imports: [PrismaModule, 
    UserModule, 
    AuthModule, 
    AdminModule,
    RoomModule, 
    UploadModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MatchModule,
    RoommateModule,],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NormalizeImagesMiddleware)
      .forRoutes({ path: 'room/*', method: RequestMethod.PATCH });
  }
}
