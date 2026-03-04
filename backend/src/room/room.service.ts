import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateRoomDto } from './dto/update-room.dto';
import { BadRequestException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
    constructor(private prisma: PrismaService) {}

    create(userId: number, dto: CreateRoomDto) {
        
        if (!dto.title) {
            throw new BadRequestException('Title is required');
        }

        return this.prisma.room.create({
            data: {
                title: dto.title,
                description: dto.description,
                price: dto.price,
                location: dto.location,
                latitude: dto.latitude ?? null,
                longitude: dto.longitude ?? null,
                images: dto.images,
                user: {
                    connect: { id: userId },
                },
            },
        });
    }

    async findAll(query: any) {
        const {
            page = 1,
            limit = 20,
            ...filters
        } = query;

        const skip = (Number(page) - 1) * Number(limit);

        const where: any = {
                isActive: true,

                location: query.location
                    ? { contains: query.location, mode: "insensitive" }
                    : undefined,

                price: {
                    gte: query.minPrice ? Number(query.minPrice) : undefined,
                    lte: query.maxPrice ? Number(query.maxPrice) : undefined,
                },

                furnished:
                    query.furnished !== undefined
                    ? query.furnished === "true"
                    : undefined,

                aircon:
                    query.aircon !== undefined
                    ? query.aircon === "true"
                    : undefined,

                parking:
                    query.parking !== undefined
                    ? query.parking === "true"
                    : undefined,

                isRenting:
                    query.isRenting !== undefined
                    ? query.isRenting === "true"
                    : undefined,
            };
        const [rooms, total] = await Promise.all([
            this.prisma.room.findMany({
                where,
                skip,
                take: Number(limit),
            }),
            this.prisma.room.count({ where }),
        ]);

        return {
            data: rooms,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
        };
    }


    async findOne(id: number) {
        const room = await this.prisma.room.findUnique({
            where: { id },
                include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });

        if (!room || !room.isActive) {
            throw new NotFoundException('Room not found');
        }

        return room;
    }

    async findOnedelete(id: number) {
        const room = await this.prisma.room.findUnique({
            where: { id,
                isActive: false,
             },
                include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });

        return room;
    }

    async getByUser(
        userId: number,
        options?: {
            includeInactive?: boolean;
            order?: 'asc' | 'desc';
        },) {
        const {
            includeInactive = false,
            order = 'asc',
        } = options || {};

        return this.prisma.room.findMany({
            where: {
            userId,
            ...(includeInactive ? {} : { isActive: true }),
            },
            orderBy: {
            id: order,
            },
        });
    }

    async getRentingByUser(userId: number) {
        return this.prisma.room.findMany({
            where: {
            userId,
            isRenting: true,
            },
            orderBy: {
            id: 'asc',
            },
        });
    }

    async getInactiveByUser(userId: number) {
        return this.prisma.room.findMany({
            where: {
            userId,
            isActive: false,
            },
            orderBy: {
            id: 'asc',
            },
        });
    }

    async admingetAllInactive() {
        return this.prisma.room.findMany({
            where: {
            isActive: false,
            },
            orderBy: {
            id: 'asc',
            },
        });
    }

    async admingetAllRented() {
        return this.prisma.room.findMany({
            where: {
            isRenting: true,
            },
            orderBy: {
            id: 'asc',
            },
        });
    }

    async admingetInactiveRoomsByUser(userId: number) {
        return this.prisma.room.findMany({
            where: {
            userId,
            isActive: false,
            },
            orderBy: {
            id: 'asc',
            },
        });
    }

    async admingetRentedRoomsByUser(userId: number) {
        return this.prisma.room.findMany({
            where: {
            userId,
            isRenting: true,
            },
            orderBy: {
            id: 'asc',
            },
        });
    }

    async update(roomId: number, userId: number, dto: UpdateRoomDto) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
        });

        if (!room) throw new BadRequestException('Room not found');

        if (room.userId !== userId)
            throw new BadRequestException('No permission');

        const {
            title,
            description,
            price,
            location,
            latitude,
            longitude,
            images,
            isActive,
            isRenting,
            minStay,
            maxStay,
            furnished,
            aircon,
            parking,
        } = dto;

        return this.prisma.room.update({
            where: { id: roomId },
            data: {
            title,
            description,
            price,
            location,
            latitude,
            longitude,
            isActive,
            isRenting,
            minStay,
            maxStay,
            furnished,
            aircon,
            parking,
            images: {
                set: images ?? [],
            },
            },
        });
    }

    async delete(roomId: number) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
        });

        if (!room) throw new BadRequestException('Room not found');

        return this.prisma.room.delete({
            where: { id: roomId },
        });
    }

    async remove(roomId: number, userId: number) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
        });

        if (!room || room.userId !== userId) {
            throw new BadRequestException('Not allowed');
        }

        return this.prisma.room.update({
            where: { id: roomId },
            data: {
            isActive: false,
            },
        });
    }

    async restore(roomId: number, userId: number) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
        });

        if (!room || room.userId !== userId) {
            throw new BadRequestException('Not allowed');
        }

        if (room.isActive) {
            throw new BadRequestException('Room already active');
        }

        return this.prisma.room.update({
            where: { id: roomId },
            data: {
            isActive: true,
            },
        });
    }
}
