import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';

@Injectable()
export class NormalizeImagesMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (!req.body || req.body.images === undefined) {
      return next();
    }

    let images = req.body.images;

    if (typeof images === 'string') {
      images = images
        .split(',')
        .map((i) => i.trim())
        .filter(Boolean);
    }

    if (!Array.isArray(images)) {
      throw new BadRequestException('images must be array or string');
    }

    req.body.images = images;
    next();
  }
}
