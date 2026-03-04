import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const totalUsers = await this.prisma.user.count();
    const totalRooms = await this.prisma.room.count();
    const activeRooms = await this.prisma.room.count({
      where: { isActive: true },
    });
    const inactiveRooms = await this.prisma.room.count({
      where: { isActive: false },
    });

    return {
      totalUsers,
      totalRooms,
      activeRooms,
      inactiveRooms,
    };
  }

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
      }, where: { role: 'USER' },
    });
  }

  async getAdmins() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
      }, where: { role: 'ADMIN' },
    });
  }

async deleteUser(id: number, currentUserId: number) {
  if (id === currentUserId) {
    throw new BadRequestException('You cannot delete yourself');
  }

  const user = await this.prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return this.prisma.user.delete({
    where: { id },
  });
}

  async getRooms() {
    return this.prisma.room.findMany({
      select: {
        id: true,
        title: true,
        isActive: true,
      },
    });
  }

  async toggleRoom(id: number) {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });

    if (!room) throw new NotFoundException('Room not found');

    return this.prisma.room.update({
      where: { id },
      data: { isActive: !room.isActive },
    });
  }

  async deleteRoom(id: number) {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });

    if (!room) throw new NotFoundException('Room not found');

    return this.prisma.room.delete({
      where: { id },
    });
  }
}