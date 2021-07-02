import { Test, TestingModule } from '@nestjs/testing';
import { PublicService } from '../../services/public/public.service';
import { PublicController } from './public.controller';
import { QueryInput } from '../../../general/dto/query-input.dto';
import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';
import fs from 'fs';
import path from 'path';

jest.mock('fs')

describe('PublicController', () => {
  let controller: PublicController;
  let publicService:PublicService;

  const mockPublicService={
    getCountriesList:jest.fn().mockResolvedValue([
      {
        "id": 1,
        "name": "United States"
      }
    ]),
    getStatesList:jest.fn().mockImplementation((id:number) => 
    Promise.resolve([
      {
        "id": 1,
        "name": "Alabama",
        "code": "AL        ",
        "country_id": 1
      }
    ])
    ),
    getSecurityQuestionsList:jest.fn().mockResolvedValue([
      {
        "id": 1,
        "question": "What is your favorite book?"
      },
    ]),
    getCategoryList:jest.fn().mockImplementation((getListdto) => 
    Promise.resolve([
      {
        "id": 1,
        "parent_category_id":14,
        "name": "Fishing",
      }
    ])
    ),
    getBrandListByCategory:jest.fn().mockImplementation((categoryId:string,query:QueryInput) => {
       return Promise.resolve([
        {
          "id": 1,
          "name": "13 Fishing",
          "brand_group": "in-built"
        },
       ])
    }),
    getShippingMethodList:jest.fn().mockResolvedValue([
      {
        "id": 1,
        "name": "Free Shipping",
        "code": "free-shipping"
      }
    ]),
    getStateTax:jest.fn().mockImplementation((id:number) => 
    Promise.resolve([
      {
        "id": 1,
        "country_id": 1,
        "state_id": 1,
        "tax_type": "percentage",
        "tax_value": 4
      }
    ])),
    getShippingPartnerList:jest.fn().mockResolvedValue([
      {
            "id": 1,
            "name": "Easy Post",
            "code": "easy_post",
            "api_available": 0,
            "tracking_type": null
      }
    ]),
    getFeesByProductPrice:jest.fn().mockImplementation((productCost:number,oldProduct:number) =>
    Promise.resolve([
      {
        "listing_fee": 300
      }
    ])
    )

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicController],
      providers:[
        {
          provide: PublicService,
          useValue: mockPublicService
        }
      ]
    })
    .compile();

    controller = module.get<PublicController>(PublicController);
    publicService=module.get<PublicService>(PublicService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCounteriesList',() => {
    it("should get list of counteries",async() => {
      await expect(controller.getCountriesList()).resolves.toEqual(
        [
          "Countries fetched successfully", 
          [
            {"id": 1, "name": "United States"}
          ]
        ]
      )
    })
  }
    )

  describe("getStatesList",() => {
    it("should get list of states belong to country Id provided",async() => {
      await expect(controller.getStatesList(1)).resolves.toEqual(
        [
          "States fetched successfully",
          [
            {
              "id": 1,
              "name": "Alabama",
              "code": "AL        ",
              "country_id": 1
            }
          ]
        ]
      )
    })
  })
  
  describe("getSecurityQuestionsList",() => {
    it("should get list of security questions",async() => {
      await expect(controller.getSecurityQuestionsList()).resolves.toEqual([
        "Security questions fetched successfully",
       [
        {
          "id": 1,
          "question": "What is your favorite book?"
        }
       ]
      ])
    })
  })

  describe("getCategoriesList",() => {
    it("should get list of categories",async() => {
      const GetCategoryListDto={
        parent_category_id:"14",
        is_active:true
      }
       await expect(controller.getCategoriesList(GetCategoryListDto)).resolves.toEqual(
         [
           "Categories fetched successfully",
           [
            {
              "id": 1,
              "parent_category_id":14,
              "name": "Fishing",
            }
           ]
         ]
       )
    })
  })


  describe("getShippingMethodList",() => {
    it("should get list of shipping method",async() => {
        await expect(controller.getShippingMethodList()).resolves.toEqual([
          "Shipping methods fetched successfully",
          [{
            "id": 1,
            "name": "Free Shipping",
            "code": "free-shipping"
          }]
        ])
    })
  })

  describe("getStateTax",() => {
    it("should get tax value based on state id",async() => {
      await expect(controller.getStateTax(1)).resolves.toEqual([
        "Tax fetched successfully",
        [
          {
            "id": 1,
            "country_id": 1,
            "state_id": 1,
            "tax_type": "percentage",
            "tax_value": 4
          }
        ]
      ])
    })
  })

  describe("getShippingPartnerList",() => {
    it("should get list of shipping partners",async() => {
        await expect(controller.getShippingPartnerList()).resolves.toEqual([
          "Shipping partner fetched successfully",
          [{
            "id": 1,
            "name": "Easy Post",
            "code": "easy_post",
            "api_available": 0,
            "tracking_type": null
          }]
        ])
    })
  })

  describe("getFeesByProductPrice",() => {
    it("should get rates by product cost",async() => {
        await expect(controller.getFeesByProductPrice(10000,500)).resolves.toEqual([
          "Fees fetched successfully",
          [
            {
              "listing_fee":300
            }
          ]
        ])
    })
  })
  
  describe("getBrandListByCategory",() => {
    it("should get list of brands based on category id",async() => {
      const query:QueryInput= {
        sort:[],
        filter:[],
        search:'B'
      }
      await expect(controller.getBrandListByCategory("1",query)).resolves.toEqual(
        [
          "Brands fetched successfully",
          [{
            "id": 1,
            "name": "13 Fishing",
            "brand_group": "in-built"
          }]
        ]
      )
    })
  })

  describe("getPrivacyPolicy",() => {
    it("accesses the right file and pipes it to response",() => {
    const mockPipe = jest.fn();
    const mockRes = createMock<Response>();
    (<jest.Mock>fs.createReadStream).mockReturnValue({
      pipe:mockPipe,
    })
    controller.getPrivacyPolicy(mockRes)
    expect(fs.createReadStream).toHaveBeenCalledWith(
      path.join(__dirname, '../../../../', 'privacy_policy.pdf'),
    )
    expect(mockPipe).toHaveBeenCalledWith(mockRes);
    })
  })
});
