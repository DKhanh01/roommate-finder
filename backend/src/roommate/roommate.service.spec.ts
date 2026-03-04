import { Test, TestingModule } from '@nestjs/testing';
import { RoommateService } from './roommate.service';

describe('RoommateService', () => {
  let service: RoommateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoommateService],
    }).compile();

    service = module.get<RoommateService>(RoommateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
