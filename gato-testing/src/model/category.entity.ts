import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Brand } from './brand.entity';
import { ProductType } from './product-type.entity';

@Entity('categories')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    parent_category_id: string;
    
    @Column()
    name: string;

    @Column()
    code: string;

    @Column({
        select: false
    })
    description: string;

    @Column()
    image_url: string;

    @Column()
    is_active: boolean;

    @Column()
    is_list_fee_required: boolean;

    @Column()
    is_subcategory_present: boolean;

    @ManyToOne(() => Category, category => category.subcategories)
    @JoinColumn({
        name: 'parent_category_id'
    })
    category: Category;
  
    @OneToMany(() => Category, subcategory => subcategory.category)
    subcategories: Category[];

    @ManyToMany(() => Brand, brand => brand.categories)
    brands: Brand[];

    @ManyToMany(() => ProductType, productType => productType.categories)
    @JoinTable({
        name: 'category_product_type'
    })
    productTypes: ProductType[];

    // @ManyToMany(() => Product, product => product.categories)
    // products: Product;
}
