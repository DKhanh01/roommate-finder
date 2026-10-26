import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}

  async recommend(userId: number) {
    const me = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!me?.latitude || !me?.longitude) {
      throw new Error('User chưa có location');
    }

    const maxScore =
      25 +
      (me.budget != null ? 20 : 0) +
      (me.smoke != null ? 10 : 0) +
      (me.pet != null ? 5 : 0) +
      (me.sleepLate != null ? 5 : 0);

    const result = await this.prisma.$queryRaw`
      SELECT
        id,
        "fullName",
        age,
        gender,
        ROUND(match_percent)::INTEGER AS "matchPercent",
        CASE
          WHEN match_percent < 40 THEN 'Low compatibility'
          WHEN match_percent < 70 THEN 'Good match'
          ELSE 'Highly compatible'
        END AS "matchLevel"
      FROM (
        SELECT
          *,
          (
            (
              CASE WHEN location = ${me.location} THEN 25 ELSE 0 END +
              CASE
                WHEN ${me.budget}::numeric IS NOT NULL AND budget IS NOT NULL
                  AND ABS(budget - ${me.budget}::numeric) < 1000000
                THEN 20 ELSE 0
              END +
              CASE
                WHEN ${me.smoke}::boolean IS NOT NULL
                  AND smoke = ${me.smoke}::boolean
                THEN 10 ELSE 0
              END +
              CASE
                WHEN ${me.pet}::boolean IS NOT NULL
                  AND pet = ${me.pet}::boolean
                THEN 5 ELSE 0
              END +
              CASE
                WHEN ${me.sleepLate}::boolean IS NOT NULL
                  AND "sleepLate" = ${me.sleepLate}::boolean
                THEN 5 ELSE 0
              END
            ) / ${maxScore}.0
          ) * 100 AS match_percent,

          (
            6371 * acos(
              LEAST(1.0, GREATEST(-1.0,
                cos(radians(${me.latitude})) *
                cos(radians(latitude)) *
                cos(radians(longitude) - radians(${me.longitude})) +
                sin(radians(${me.latitude})) *
                sin(radians(latitude))
              ))
            )
          ) AS distance

        FROM "User"
        WHERE id != ${userId}
          AND role = 'USER'
          AND latitude IS NOT NULL
          AND longitude IS NOT NULL
      ) u
      WHERE distance < 3
      ORDER BY "matchPercent" DESC, distance ASC, id ASC
      LIMIT 20
    `;

    console.log(result);

  return result;  
  }
}