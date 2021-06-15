import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attribute } from './attribute.entity';
import { ProductAttributeMap } from './product-attribute-map.entity';
import { ProductAttributeValue } from './product-attribute-value.entity';


@Entity('product_attributes')
export class ProductAttribute extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    product_type_id: string;

    @Column()
    attribute_id: string;

    @Column()
    is_active: boolean;

    @OneToMany(() => ProductAttributeMap, attributeMap => attributeMap.productAttribute)
    attributeMaps: ProductAttributeMap[];

    // @ManyToOne(() => ProductAttributeValue, attributeValue => attributeValue.attributeMaps)
    // @JoinColumn({
    //     name: 'product_id'
    // })
    // values: ProductAttributeValue;

    @ManyToOne(() => Attribute, attribute => attribute.productAttributes)
    @JoinColumn({
        name: 'attribute_id'
    })
    attribute: Attribute;
}
