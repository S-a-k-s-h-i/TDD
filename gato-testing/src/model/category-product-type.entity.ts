import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductType } from './../model/product-type.entity';

@Entity('category_product_type')
export class CategoryProductType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    product_type_id: string;

    @Column()
    category_id: string;

    @ManyToOne(() => ProductType, productType => productType.categoryProductTypes)
    @JoinColumn({
        name: 'product_type_id'
    })
    productType: ProductType;
}
