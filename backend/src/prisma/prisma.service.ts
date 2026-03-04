import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit {

  constructor() {
    super();

    const client = this.$extends({
      query: {
        room: {
          create({ args, query }) {
            normalizeImages(args.data);
            return query(args);
          },
          update({ args, query }) {
            normalizeImages(args.data);
            return query(args);
          },
        },
      },
    });

    Object.assign(this, client);
  }

  async onModuleInit() {
    await this.$connect();
  }
}

function normalizeImages(data: any) {
  if (data?.images === undefined) return;

  let images = data.images;

  if (images?.set) {
    if (!Array.isArray(images.set)) {
      throw new Error('images must be an array');
    }

    data.images = images.set
      .map((i: string) => i.trim())
      .filter(Boolean);

    return;
  }

  if (typeof images === 'string') {
    images = images
      .split(',')
      .map((i: string) => i.trim())
      .filter(Boolean);
  }

  if (!Array.isArray(images)) {
    throw new Error('images must be an array');
  }

  data.images = images;
}