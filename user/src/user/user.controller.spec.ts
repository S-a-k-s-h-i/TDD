import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';


describe('UserController', () => {
  let controller: UserController;
  let dto = { id:expect.any(Number), 
              name:expect.any(String),
              password:expect.any(String),
              age:expect.any(Number),
              PhoneNo:expect.any(Number) 
            }
  let mockUserService = {
   
    getUserById:jest.fn(id => {
         return dto
    }),

    createUser:jest.fn(dto => {
      return {
        id:Date.now(),
        ...dto
      }
    }),
    updateUser:jest.fn((id,dto) => {
        return {
          id,
          ...dto
        }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[UserService]
    }).overrideProvider(UserService).useValue(mockUserService).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user',() => {
    expect(controller.createUser({
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

  // expect(mockUserService.createUser).toHaveBeenCalledWith({
  //   name:'sakshi',
  //   password:'password',
  //   age:23,
  //   PhoneNo:123456
  // })

  it('should update user ',() => {
    const dto = { age:24 }

    expect(controller.updateUser(1,dto)).toEqual({
      id:1,
      ...dto
    })
  })

  it('should get a user by id',() => {
    expect(controller.getUserById(1)).toEqual({
        id:1,
        name:'sakshi',
        password:'password',
        age:23,
        PhoneNo:123456
    })
  })

 
});
