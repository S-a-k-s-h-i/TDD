import { Test, TestingModule } from '@nestjs/testing';
import { UserQna } from '../model/user-qna.entity';
import { UserQnaRepository } from './repositories/user-qna.repository';
import { UserQnaService } from './user-qna.service';

describe('UserQnaService', () => {
  let service: UserQnaService;
  let userQnaRepository:UserQnaRepository;
  const mockUserQnaRepository= () => ({
    createMany:jest.fn(),
    updateMany:jest.fn()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserQnaService,
               {
                 provide:UserQnaRepository,
                 useFactory:mockUserQnaRepository
               }
      ],
    })
    .compile();

    service = module.get<UserQnaService>(UserQnaService);
    userQnaRepository = module.get<UserQnaRepository>(UserQnaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('storeUserQna',() => {
    it('should store user qna',async () => {
     jest.spyOn(userQnaRepository,"createMany").mockResolvedValue(("userQna" as any) as UserQna[])
     const UserqnaDto=[
      {
        security_question_id:1,
        answer:'first',
        id:1
      },
    ]
     const result = await service.storeUserQna(UserqnaDto);
     expect(userQnaRepository.createMany).toHaveBeenCalledWith(
       UserqnaDto
     );
     expect(result).toEqual("userQna");
    })
  })
});
