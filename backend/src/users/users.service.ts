import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMyProfile(userId: number) {
      return this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          email: true,
          fullName: true,
          phone: true,

          age: true,
          gender: true,
          budget: true,
          location: true,
          bio: true,

          smoke: true,
          pet: true,
          sleepLate: true,
        },
      });
  }


  updateProfile(userId: number, dto: any) {
    
    if (!userId) throw new BadRequestException('Invalid user');

    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        fullName: true,
        age: true,
        phone: true,
        gender: true,
        budget: true,
        location: true,
        latitude: true,
        longitude: true,
        bio: true,
        smoke: true,
        pet: true,
        sleepLate: true,
      },
    });
  }

  async getOneUser(userId: number) {
    if (!userId) {
      throw new BadRequestException('Invalid user');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        fullName: true,
        phone: true,

        age: true,
        gender: true,
        budget: true,
        location: true,
        bio: true,

        smoke: true,
        pet: true,
        sleepLate: true,
        
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  // async updateAvatar(userId: number, file: Express.Multer.File) {
  //   if (!file) throw new BadRequestException('No file');

  //   const url = await this.uploadToCloud(file); 

  //   return this.prisma.user.update({
  //     where: { id: userId },
  //     data: { avatar: url },
  //   });
  // }

//   private async uploadToCloud(file: Express.Multer.File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload_stream(
//       { folder: 'avatars' },
//       (err, result) => {
//         if (err) return reject(err);
//         resolve(result.secure_url);
//       },
//     ).end(file.buffer);
//   });
//  }
}
