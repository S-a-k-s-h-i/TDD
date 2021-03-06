import { Repository, EntityRepository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const { name, description, price } = createProductDto;

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;

    await product.save();
    return product;
  }

  public async editProduct(
    createProductDto: CreateProductDto,
    editedProduct: Product,
  ): Promise<Product> {
    const { name, description, price } = createProductDto;

    editedProduct.name = name;
    editedProduct.description = description;
    editedProduct.price = price;
    await editedProduct.save();

    return editedProduct;
  }
}