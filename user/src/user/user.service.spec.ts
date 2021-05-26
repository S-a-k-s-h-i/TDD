import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
     createUser: jest.fn().mockImplementation(dto => dto),
     save:jest.fn().mockImplementation(user => Promise.resolve({id:Date.now(),...user})),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{
        provide:getRepositoryToken(User),
        useValue:mockUserRepository
      }
    ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return that', async() => {
    expect(await service.createUser({
      name:'sakshi',
      password:'password',
      age:23,
      PhoneNo:123456
    })).toEqual({
      id:expect.any(Number),
      name:'sakshi',
      password:'password',
      age:23,
      PhoneNo:123456
    })
  })
});
