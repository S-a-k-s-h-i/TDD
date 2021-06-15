import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { ProductAttribute } from './product-attribute.entity';
import { ProductAttributeValue } from './product-attribute-value.entity';

@Entity('product_attribute_map')
export class ProductAttributeMap extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    product_id: string;

    @Column()
    product_attribute_id: string;

    @Column()
    product_attribute_value_id: string;

    @ManyToOne(() => Product, product => product.attributeMaps)
    @JoinColumn({
        name: 'product_id'
    })
    product: Product;

    @ManyToOne(() => ProductAttribute, attribute => attribute.attributeMaps)
    @JoinColumn({
        name: 'product_attribute_id'
    })
    productAttribute: ProductAttribute;

    @ManyToOne(() => ProductAttributeValue, attributeValue => attributeValue.attributeMaps)
    @JoinColumn({
        name: 'product_attribute_value_id'
    })
    values: ProductAttributeValue;
    

    
}
