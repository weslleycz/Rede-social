import { Test, TestingModule } from '@nestjs/testing';
import { OnlineCheckGateway } from './online-check.gateway';

describe('OnlineCheckGateway', () => {
  let gateway: OnlineCheckGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnlineCheckGateway],
    }).compile();

    gateway = module.get<OnlineCheckGateway>(OnlineCheckGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
