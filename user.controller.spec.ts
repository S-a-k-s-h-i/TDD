import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserServiceInterface } from '../../interfaces/user.service.interface';
import { FindDuplicateDto } from '../../dto/find-duplicate-value.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from '../../dto/update-password.dto';
import { User } from '../../../model/user.entity';
import { createMock } from '@golevelup/ts-jest';
import { UpdateUserRoleDto } from '../../dto/update-user-role.dto';

describe('UserController', () => {
  let controller: UserController;
  let userServiceInterface:UserServiceInterface;
  
  const buyer ={
    id: "25",
    is_buyer: true,
    is_seller: false,
    firstname: "Satya",
    lastname: "Prakash",
    email: "satya.prakash@crownstack.com",
    country_code: null,
    phone: null,
    username: "satya.prakash",
    dob: null,
    created_at:new Date()
}
const seller = {
  id: "26",
  is_buyer: false,
  is_seller: true,
  firstname: "rohit",
  lastname: "singh",
  email: "rohit.singh@crownstack.com",
  country_code: null,
  phone: null,
  username: "rohit.singh",
  dob: null,
  created_at:new Date()
}
const mockReq= createMock<Request>();

  const mockServiceUserInterface={

    findDuplicateValue:jest.fn().mockImplementation((findDuplicateDto:FindDuplicateDto) => {
      return Promise.resolve(true)
    }),

    createUser:jest.fn().mockImplementation((createUserDto:CreateUserDto) => {
      return Promise.resolve({id:1})
    }),

    updateUserPassword:jest.fn().mockResolvedValue(true),
    getUserProfile:jest.fn().mockImplementation((userDto:User,role:string) => {
      if(role==='buyer')return Promise.resolve(buyer)
      else return Promise.resolve(seller)
    }),

    updateUserRole:jest.fn().mockImplementation((updateUserRoleDto, userDto?: User) => {
      return Promise.resolve({id:1,is_buyer:true,is_seller:true})
    }),
    handleAccountNotification:jest.fn().mockResolvedValue(true)

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[
        {
          provide:'UserServiceInterface',
          useValue:mockServiceUserInterface
          
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("findDuplicateValue",() => {
    it("should get duplicate data if exists ",() => {
      const findDuplicateDto:FindDuplicateDto={
            field:"phone",
            value:"%123",
            user_id:1
      }
      expect(controller.findDuplicateValue(findDuplicateDto)).resolves.toEqual([
        "Phone available",
         true
      ])
    })
    it("should throw an error as the field already exist",() => {
      const findDuplicateDto:FindDuplicateDto={
        field:"phone",
        value:"%123",
        user_id:1
      }
      jest.spyOn(mockServiceUserInterface,"findDuplicateValue").mockRejectedValue(new HttpException("Phone already exists",null));
      expect(controller.findDuplicateValue(findDuplicateDto)).rejects.toThrow(new HttpException("Phone already exists",null))

    })
  })

  describe("createUser",() => {
    it("should creates a new user",() => {
      const createUserDto:CreateUserDto ={
        firstname:"sakshi",
        lastname:"pokhria",
        email:"sakshi@gmail.com",
        username:"sakshi",
        password:"password",
        is_buyer:true,
        is_seller:false,
        buyer:{
          profile_image_url: "https://sfkshfsd.sfsdf"
        },
        seller:null,
        product:null
      }
      expect(controller.createUser(createUserDto)).resolves.toEqual([
        "Registration Successful",
         {id:1}
      ])
    })
  })

  describe("resetPassword",() => {
    const updatePassworddto:UpdatePasswordDto={
      password:"password",
      confirmPassword:"password",
      purpose:"reset",
      userId:1,
    }
    it("should reset password",() => {
      expect(controller.resetPassword(updatePassworddto)).resolves.toEqual([
        "Password reset successful"
      ])
    })
    it("should throw an error when the user doesn't exist",async() => {
      jest.spyOn(mockServiceUserInterface,"updateUserPassword").mockRejectedValueOnce(
        new HttpException("User does not exist",HttpStatus.BAD_REQUEST)
      )
      await expect(controller.resetPassword(updatePassworddto)).rejects.toThrow(
        new HttpException("User does not exist",HttpStatus.BAD_REQUEST)
      )
    })

    it("should should throw error asthe old password is not equal to user password",() => {
      jest.spyOn(mockServiceUserInterface,"updateUserPassword").mockRejectedValueOnce(
        new HttpException("Invalid Password",HttpStatus.BAD_REQUEST)
      )
      expect(controller.resetPassword(updatePassworddto)).rejects.toThrow(
        new HttpException("Invalid Password",HttpStatus.BAD_REQUEST)
      )
    })
  })

  describe("getUserProfile",() => {
    it("should get profile if role is buyer",() => {
           expect(controller.getUserProfile(mockReq,"buyer")).resolves.toEqual([
             "Profile fetched successfully",
             buyer
           ])
    })
    it("should get profile if role is seller",() => {
      expect(controller.getUserProfile(mockReq,"seller")).resolves.toEqual([
        "Profile fetched successfully",
        seller
      ])
    })

    it("should throw an error as User does not have seller role",() => {
      jest.spyOn(mockServiceUserInterface,"getUserProfile").mockRejectedValue(
        new HttpException("INVALID_ROLE",HttpStatus.BAD_REQUEST)
      )
      expect(controller.getUserProfile(mockReq,"seller")).rejects.toThrow(
        new HttpException("INVALID_ROLE",HttpStatus.BAD_REQUEST)
      )
    })

    it("should throw an error as User does not have buyer role",() => {
      jest.spyOn(mockServiceUserInterface,"getUserProfile").mockRejectedValue(
        new HttpException("INVALID_ROLE",HttpStatus.BAD_REQUEST)
      )
      expect(controller.getUserProfile(mockReq,"buyer")).rejects.toThrow(
        new HttpException("INVALID_ROLE",HttpStatus.BAD_REQUEST)
      )
    })

  })

  describe("assignRoleToUser",() => {
    it("should assign a role to user",() => {
      const updateUserRoleDto:UpdateUserRoleDto={  
         role: "buyer",
         google_place_id:"google_place_id",
         latitude:"12",
         longitude:"11",
         address_line_1:"address",
         country_id:1,
         state_id:22,
         city:"new york",
         zipcode:"zz",
         profile_image_url: "http://dsfdsfsdfdsf.dsfds"
      }
      expect(controller.assignRoleToUser(updateUserRoleDto,mockReq)).resolves.toEqual([
        "User has been assigned to new role",
        {id:1,is_buyer:true,is_seller:true}
      ])
    })
  })

  describe(" handleAccountNotification",() => {
    it("should get notifications from stripe accounts",() => {
    const notifyBodyDto=[]
    expect(controller.handleAccountNotification(notifyBodyDto)).resolves.toEqual([
      "Notification handled successfully"
    ])
    })
  })
});
