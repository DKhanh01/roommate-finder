import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RoommateQueryDto } from "./dto/roommate.dto";

@Injectable()
export class RoommateService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: RoommateQueryDto, currentUserId: number) {
    const {
      gender,
      ageRange,
      budgetRange,
      smoke,
      pet,
      sleepLate,
      page = 1,
      limit = 20,
    } = query as any;

    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {
      role: "USER",
      id: { not: currentUserId },
    };

    if (gender) where.gender = gender;

    if (smoke !== undefined) where.smoke = smoke;
    if (pet !== undefined) where.pet = pet;
    if (sleepLate !== undefined) where.sleepLate = sleepLate;

    if (ageRange) {
      const [minAge, maxAge] = ageRange.split("-").map(Number);
      where.age = { gte: minAge, lte: maxAge };
    }

    if (budgetRange) {
      const [minBudget, maxBudget] = budgetRange.split("-").map(Number);
      where.budget = { gte: minBudget, lte: maxBudget };
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: Number(limit),
        select: {
          id: true,
          fullName: true,
          age: true,
          budget: true,
          smoke: true,
          pet: true,
          sleepLate: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const result = users.map((user) => {
      const matchPercent = Math.floor(Math.random() * 100);

      let matchLevel = "Low compatibility";
      if (matchPercent >= 70) matchLevel = "Highly compatible";
      else if (matchPercent >= 40) matchLevel = "Good match";

      return {
        id: user.id,
        fullName: user.fullName,
        matchPercent,
        matchLevel,
      };
    });

    return {
      data: result,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    };
  }
}
