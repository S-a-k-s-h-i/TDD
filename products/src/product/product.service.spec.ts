import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Any } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository:ProductRepository

  const mockProductRepository=() => ({
    createProduct:jest.fn(),
    find:jest.fn(),
    findOne:jest.fn(),
    editProduct:jest.fn()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide:ProductRepository,
          useFactory:mockProductRepository
        }
    ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository)
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('createProduct', () => {
    it('should save a product in the database', async () => {
      jest.spyOn(productRepository,"createProduct").mockResolvedValue(("someProduct" as unknown) as Product)
      expect(productRepository.createProduct).not.toHaveBeenCalled();
      const createProductDto = {
        name: 'sample name',
        description: 'sample description',
        price: 'sample price',
      };
      const result = await productService.createProduct(createProductDto);
      console.log(result);
      expect(productRepository.createProduct).toHaveBeenCalledWith(
        createProductDto,
      );
      expect(result).toEqual("someProduct");
    });
  });

  describe('getProducts', () => {
    it('should get all products', async () => {
      jest.spyOn(productRepository,"find").mockResolvedValue(("someProducts" as unknown) as Product[])
      expect(productRepository.find).not.toHaveBeenCalled();
      const result = await productService.getProducts();
      expect(productRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someProducts');
    });
  });

    describe('getProduct', () => {
      it('should retrieve a product with an ID', async () => {
        const mockProduct = {
          name: 'name',
          description: 'description',
          price: 'price',
        };
        jest.spyOn(productRepository,"findOne").mockResolvedValue((mockProduct as unknown) as Product);
        const result = await productService.getProduct(1);
        console.log(result)
        expect(result).toEqual(mockProduct);
        expect(productRepository.findOne).toHaveBeenCalledWith(1);
      });
    

    it('throws an error as a product is not found', async() => {
      jest.spyOn(productRepository,"findOne").mockResolvedValue(null);
      expect(productService.getProduct(1)).rejects.toThrow(NotFoundException);
    });

  })
  
  // describe("editProduct",() => {
  //   it('should update the product with given id',async() => {
  //     const updateProduct = {
  //       name: 'update name',
  //       description: 'update description',
  //       price: 'update price',
  //     }
  //     jest.spyOn(productRepository,"editProduct").mockResolvedValue((updateProduct as unknown) as Product)
  //     const editedProduct = await productRepository.findOne(1);
  //     const result = await productService.editProduct(1,updateProduct)
  //     expect(productRepository.editProduct).toHaveBeenCalledWith(updateProduct,editedProduct)
  //     expect(result).toEqual(updateProduct)
  //   })


      
  // })

  
})