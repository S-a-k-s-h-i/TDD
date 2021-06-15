import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { Metadata } from './metadata.entity';
import { Attribute } from './attribute.entity';
import { CategoryProductType } from './category-product-type.entity';

@Entity('product_types')
export class ProductType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    is_active: boolean;

    @OneToMany(() => Product, product => product.productType)
    products: Product[];

    @OneToMany(() => CategoryProductType, categoryProductType => categoryProductType.productType)
    categoryProductTypes: CategoryProductType[];

    @ManyToMany(() => Category, category => category.productTypes)
    @JoinTable({
        name: 'category_product_type'
    })
    categories: Category[];

    @ManyToMany(() => Metadata, metadata => metadata.productTypes)
    @JoinTable({
        name: 'product_metadata',
        joinColumn: {
            name: "product_type_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "metadata_id",
            referencedColumnName: "id"
        }
    })
    metadatas: Metadata[];

    @ManyToMany(() => Attribute, attribute => attribute.productTypes)
    @JoinTable({
        name: 'product_attributes',
        joinColumn: {
            name: "product_type_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "attribute_id",
            referencedColumnName: "id"
        }
    })
    attributes: Attribute[];

}
 