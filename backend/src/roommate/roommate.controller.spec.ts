import { Test, TestingModule } from '@nestjs/testing';
import { RoommateController } from './roommate.controller';

describe('RoommateController', () => {
  let controller: RoommateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoommateController],
    }).compile();

    controller = module.get<RoommateController>(RoommateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
